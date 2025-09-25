"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const todosController_1 = require("../controllers/todosController");
const router = express_1.default.Router();
router.use(auth_1.authMiddleware);
router.get("/", todosController_1.getTodo);
router.post("/", todosController_1.createTodo);
router.put("/:id", todosController_1.editTodo);
router.delete("/:id", todosController_1.deleteTodo);
exports.default = router;
//# sourceMappingURL=todosRoutes.js.map