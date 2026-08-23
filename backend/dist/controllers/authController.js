"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.updatePassword = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../db"));
const jwt_1 = require("../utils/jwt");
const register = async (req, res) => {
    try {
        const { name, email, password, address } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }
        const trimmedName = name.trim();
        const trimmedEmail = email.trim().toLowerCase();
        const trimmedAddress = (address || '').trim();
        if (trimmedName.length < 20 || trimmedName.length > 60) {
            return res.status(400).json({ message: 'Name must be between 20 and 60 characters' });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            return res.status(400).json({ message: 'Please enter a valid email address' });
        }
        if (trimmedAddress.length > 400) {
            return res.status(400).json({ message: 'Address cannot exceed 400 characters' });
        }
        if (password.length < 8 ||
            password.length > 16 ||
            !/[A-Z]/.test(password) ||
            !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return res.status(400).json({
                message: 'Password must be 8–16 characters with at least 1 uppercase and 1 special character',
            });
        }
        const existingUser = await db_1.default.user.findUnique({ where: { email: trimmedEmail } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Public registration is ALWAYS NORMAL_USER
        const user = await db_1.default.user.create({
            data: {
                name: trimmedName,
                email: trimmedEmail,
                password: hashedPassword,
                address: trimmedAddress,
                role: 'NORMAL_USER',
            },
        });
        const token = (0, jwt_1.generateToken)(user.id, user.role);
        res.status(201).json({
            user: { id: user.id, name: user.name, email: user.email, address: user.address, role: user.role },
            token,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error during registration', error });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const trimmedEmail = email.trim().toLowerCase();
        const user = await db_1.default.user.findUnique({ where: { email: trimmedEmail } });
        if (!user) {
            return res.status(401).json({ message: 'Email or password doesn’t match. Please try again.' });
        }
        const isMatch = await bcryptjs_1.default.compare(password.trim(), user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email or password doesn’t match. Please try again.' });
        }
        const token = (0, jwt_1.generateToken)(user.id, user.role);
        res.json({
            user: { id: user.id, name: user.name, email: user.email, address: user.address, role: user.role },
            token,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error during login', error });
    }
};
exports.login = login;
const updatePassword = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { oldPassword, newPassword } = req.body;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: 'Both old and new passwords are required' });
        }
        const user = await db_1.default.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcryptjs_1.default.compare(oldPassword.trim(), user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect current password' });
        }
        if (newPassword.length < 8 ||
            newPassword.length > 16 ||
            !/[A-Z]/.test(newPassword) ||
            !/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
            return res.status(400).json({
                message: 'New password must be 8–16 characters with at least 1 uppercase and 1 special character',
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(newPassword.trim(), 10);
        await db_1.default.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });
        res.json({ message: 'Password updated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating password', error });
    }
};
exports.updatePassword = updatePassword;
const getMe = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ message: 'Unauthorized' });
        const user = await db_1.default.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, email: true, address: true, role: true, createdAt: true },
        });
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error });
    }
};
exports.getMe = getMe;
