"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = void 0;
const getCurrentUser = (req, res) => {
    if (req?.user) {
        res.json({
            id: req.user.id,
            username: req.user.username,
            email: req.user.email,
        });
    }
};
exports.getCurrentUser = getCurrentUser;
//# sourceMappingURL=userController.js.map