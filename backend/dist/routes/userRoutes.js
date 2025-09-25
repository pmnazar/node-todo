"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_js_1 = require("../middleware/auth.js");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.use(auth_js_1.authMiddleware);
router.get("/me", userController_1.getCurrentUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map