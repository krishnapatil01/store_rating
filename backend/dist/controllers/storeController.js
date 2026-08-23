"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStore = exports.createStore = exports.getStores = void 0;
const db_1 = __importDefault(require("../db"));
const getStores = async (req, res) => {
    try {
        const { search, name, address, email, sort } = req.query;
        const where = {};
        if (search) {
            const q = String(search).toLowerCase();
            where.OR = [
                { name: { contains: q } },
                { address: { contains: q } },
                { email: { contains: q } },
            ];
        }
        else {
            if (name)
                where.name = { contains: String(name) };
            if (address)
                where.address = { contains: String(address) };
            if (email)
                where.email = { contains: String(email) };
        }
        const stores = await db_1.default.store.findMany({
            where,
            include: {
                ratings: {
                    include: {
                        user: { select: { id: true, name: true, email: true } },
                    },
                },
                owner: { select: { id: true, name: true, email: true } },
            },
        });
        const storesWithStats = stores.map((store) => {
            const totalRatings = store.ratings.length;
            const sum = store.ratings.reduce((acc, r) => acc + r.score, 0);
            const averageRating = totalRatings > 0 ? Number((sum / totalRatings).toFixed(2)) : 0;
            return {
                id: store.id,
                name: store.name,
                email: store.email,
                address: store.address,
                ownerId: store.ownerId,
                ownerName: store.owner?.name || 'Assigned Owner',
                averageRating,
                totalRatings,
                createdAt: store.createdAt,
                updatedAt: store.updatedAt,
                ratings: store.ratings,
            };
        });
        const sortOption = String(sort || 'name_asc');
        if (sortOption === 'rating' || sortOption === 'rating_desc') {
            storesWithStats.sort((a, b) => b.averageRating - a.averageRating);
        }
        else if (sortOption === 'rating_asc') {
            storesWithStats.sort((a, b) => a.averageRating - b.averageRating);
        }
        else if (sortOption === 'email_asc') {
            storesWithStats.sort((a, b) => a.email.localeCompare(b.email));
        }
        else if (sortOption === 'email_desc') {
            storesWithStats.sort((a, b) => b.email.localeCompare(a.email));
        }
        else if (sortOption === 'name_desc') {
            storesWithStats.sort((a, b) => b.name.localeCompare(a.name));
        }
        else {
            storesWithStats.sort((a, b) => a.name.localeCompare(b.name));
        }
        res.json(storesWithStats);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching stores', error });
    }
};
exports.getStores = getStores;
const createStore = async (req, res) => {
    try {
        const { name, email, address, ownerId } = req.body;
        if (!name || !email || !address || !ownerId) {
            return res.status(400).json({ message: 'Store Name, Email, Address, and Owner are required' });
        }
        const trimmedName = name.trim();
        const trimmedEmail = email.trim().toLowerCase();
        const trimmedAddress = address.trim();
        if (trimmedName.length < 20 || trimmedName.length > 60) {
            return res.status(400).json({ message: 'Store name must be between 20 and 60 characters' });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            return res.status(400).json({ message: 'Please provide a valid store email address' });
        }
        if (trimmedAddress.length > 400) {
            return res.status(400).json({ message: 'Address must not exceed 400 characters' });
        }
        const existingStore = await db_1.default.store.findUnique({ where: { email: trimmedEmail } });
        if (existingStore) {
            return res.status(400).json({ message: 'A store with this email already exists' });
        }
        const owner = await db_1.default.user.findUnique({ where: { id: ownerId } });
        if (!owner) {
            return res.status(400).json({ message: 'Selected owner not found' });
        }
        const store = await db_1.default.store.create({
            data: {
                name: trimmedName,
                email: trimmedEmail,
                address: trimmedAddress,
                ownerId,
            },
        });
        // Update user role to STORE_OWNER if not already
        if (owner.role !== 'STORE_OWNER') {
            await db_1.default.user.update({
                where: { id: ownerId },
                data: { role: 'STORE_OWNER' },
            });
        }
        res.status(201).json(store);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating store', error });
    }
};
exports.createStore = createStore;
const deleteStore = async (req, res) => {
    try {
        const id = String(req.params.id);
        await db_1.default.rating.deleteMany({ where: { storeId: id } });
        await db_1.default.store.delete({ where: { id } });
        res.json({ message: 'Store deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting store', error });
    }
};
exports.deleteStore = deleteStore;
