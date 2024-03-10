"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.cookies["auth_token"];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    ;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, "ezTKcDwqnfcM8JvYDbNB7NBDkxAQ5TXw");
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        res.status(400).json({ message: "Unauthorized" });
    }
};
exports.default = verifyToken;
