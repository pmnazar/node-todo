"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.refreshToken = exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const tokenServices_js_1 = require("../services/tokenServices.js");
const isProd = process.env.NODE_ENV === "production";
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashed = await bcryptjs_1.default.hash(password, 10);
        const user = new User_1.default({ username, password: hashed, email });
        await user.save();
        res.json({ message: "User registered successfull" });
    }
    catch (e) {
        res
            .status(500)
            .json({ message: "Error registering user", error: e.message });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User_1.default.findOne({ username });
        if (!user)
            return res.status(401).json({ message: "Invalid credencials" });
        const isValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isValid)
            return res.status(401).json({ message: "Invalid credencials" });
        const accessToken = (0, tokenServices_js_1.generateAccessToken)(user);
        const refreshToken = await (0, tokenServices_js_1.generateRefreshToken)(user);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.json({ accessToken });
    }
    catch (e) {
        res.status(500).json({ message: "Login error", error: e.message });
    }
};
exports.loginUser = loginUser;
const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token || typeof token !== "string")
            return res.sendStatus(401);
        const payload = (await (0, tokenServices_js_1.verifyRefreshToken)(token));
        if (!payload)
            return res.sendStatus(403);
        const accessToken = (0, tokenServices_js_1.generateAccessToken)({
            id: payload.id,
            username: payload.username,
        });
        res.json({ accessToken });
    }
    catch (e) {
        res.status(500).json({ message: "Refresh token error", error: e.message });
    }
};
exports.refreshToken = refreshToken;
const logoutUser = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (token && typeof token === "string") {
            await (0, tokenServices_js_1.revokeRefreshToken)(token); // delete from DB
        }
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "strict",
        });
        res.sendStatus(204);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Logout error", error: e.message });
    }
};
exports.logoutUser = logoutUser;
//# sourceMappingURL=authController.js.map