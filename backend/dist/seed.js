"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = seedDatabase;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("./db"));
async function seedDatabase() {
    console.log('Seeding database with authentic accounts and stores...');
    // 1. Clean existing records safely
    await db_1.default.rating.deleteMany({});
    await db_1.default.store.deleteMany({});
    await db_1.default.user.deleteMany({});
    // 2. Hash default passwords
    const adminPassword = await bcryptjs_1.default.hash('Admin@1234', 10);
    const ownerPassword = await bcryptjs_1.default.hash('Owner@1234', 10);
    const userPassword = await bcryptjs_1.default.hash('User@1234', 10);
    // 3. Create Admin
    const admin = await db_1.default.user.create({
        data: {
            name: 'Eleanor Vance Administrator',
            email: 'admin@storeratings.io',
            password: adminPassword,
            address: '742 Evergreen Terrace, Sector 4, Capital City',
            role: 'SYSTEM_ADMIN',
        },
    });
    // 4. Create Store Owners
    const owner1 = await db_1.default.user.create({
        data: {
            name: 'Julian Hayes Store Owner',
            email: 'julian@artisancoffee.co',
            password: ownerPassword,
            address: '124 Market Square, Suite 10, Downtown District',
            role: 'STORE_OWNER',
        },
    });
    const owner2 = await db_1.default.user.create({
        data: {
            name: 'Clara Oswald Bookshop Owner',
            email: 'stories@illustratedbooks.com',
            password: ownerPassword,
            address: '456 Oak Avenue, Westside Arts Quarter',
            role: 'STORE_OWNER',
        },
    });
    const owner3 = await db_1.default.user.create({
        data: {
            name: 'Marcus Vance Studio Owner',
            email: 'grow@greenflorastudio.com',
            password: ownerPassword,
            address: '789 Pine Road, Suburbian Greenhouse Plaza',
            role: 'STORE_OWNER',
        },
    });
    // 5. Create Normal Users
    const user1 = await db_1.default.user.create({
        data: {
            name: 'Maya Robertson Lin Community Reviewer',
            email: 'maya.lin@gmail.com',
            password: userPassword,
            address: '108 West End Blvd, Apartment 4B, Metro District',
            role: 'NORMAL_USER',
        },
    });
    const user2 = await db_1.default.user.create({
        data: {
            name: 'Liam Sterling Senior Explorer',
            email: 'liam.sterling@outlook.com',
            password: userPassword,
            address: '55 Beacon Hill, Boston Metro',
            role: 'NORMAL_USER',
        },
    });
    const user3 = await db_1.default.user.create({
        data: {
            name: 'Sophia Chen Tech Reviewer',
            email: 'sophia.chen@techhub.io',
            password: userPassword,
            address: '89 Innovation Way, Tech Valley',
            role: 'NORMAL_USER',
        },
    });
    // 6. Create Stores
    const store1 = await db_1.default.store.create({
        data: {
            name: 'Artisan Coffee Roasters',
            email: 'hello@artisancoffee.co',
            address: '124 Market Square, Suite 10, Downtown District',
            ownerId: owner1.id,
        },
    });
    const store2 = await db_1.default.store.create({
        data: {
            name: 'The Illustrated Bookshop',
            email: 'stories@illustratedbooks.com',
            address: '456 Oak Avenue, Westside Arts Quarter',
            ownerId: owner2.id,
        },
    });
    const store3 = await db_1.default.store.create({
        data: {
            name: 'Green Flora Botanical Studio',
            email: 'grow@greenflorastudio.com',
            address: '789 Pine Road, Suburbian Greenhouse Plaza',
            ownerId: owner3.id,
        },
    });
    // 7. Create Authentic Ratings
    await db_1.default.rating.createMany({
        data: [
            { userId: user1.id, storeId: store1.id, score: 5 },
            { userId: user2.id, storeId: store1.id, score: 5 },
            { userId: user3.id, storeId: store1.id, score: 4 },
            { userId: user1.id, storeId: store2.id, score: 5 },
            { userId: user2.id, storeId: store2.id, score: 5 },
            { userId: user3.id, storeId: store3.id, score: 5 },
        ],
    });
    console.log('Database successfully seeded with users, stores, and ratings.');
}
if (require.main === module) {
    seedDatabase()
        .then(() => process.exit(0))
        .catch((err) => {
        console.error('Seed error:', err);
        process.exit(1);
    });
}
