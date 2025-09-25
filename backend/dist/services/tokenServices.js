"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
exports.verifyRefreshToken = verifyRefreshToken;
exports.revokeRefreshToken = revokeRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const RefreshToken_js_1 = __importDefault(require("../models/RefreshToken.js"));
function generateAccessToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10s" });
}
async function generateRefreshToken(user) {
    const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days
    await RefreshToken_js_1.default.create({ token, userId: user.id, expiresAt });
    return token;
}
async function verifyRefreshToken(token) {
    const storedToken = await RefreshToken_js_1.default.findOne({ token });
    if (!storedToken)
        return null;
    try {
        return jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET);
    }
    catch (err) {
        return null;
    }
}
async function revokeRefreshToken(token) {
    await RefreshToken_js_1.default.deleteOne({ token });
}
//# sourceMappingURL=tokenServices.js.map