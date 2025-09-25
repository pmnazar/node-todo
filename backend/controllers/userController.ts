import { Request, Response } from "express";
export const getCurrentUser = (req: Request, res: Response) => {
  if (req?.user) {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
    });
  }
};
