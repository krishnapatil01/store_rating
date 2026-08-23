"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt_1 = require("../utils/jwt");
const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'Access denied' });
    try {
        const verified = (0, jwt_1.verifyToken)(token);
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};
exports.authenticate = authenticate;
