import express, { NextFunction, Request, Response } from "express";
import { login, signup, verifyEmail } from "../controllers/authController";

const router = express.Router();

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await login(req, res);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }
);
router.post("/signup",  async (req: Request, res: Response) => {
  try {
    await signup(req, res);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

router.post("/verification",  async (req: Request, res: Response) => {
  try {
    await verifyEmail(req, res);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

export default router;
