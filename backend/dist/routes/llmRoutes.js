"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const llmController_1 = require("../controllers/llmController");
const router = express_1.default.Router();
router.use(auth_1.authMiddleware);
router.post("/create-task", llmController_1.createTodoFromText);
exports.default = router;
//# sourceMappingURL=llmRoutes.js.map