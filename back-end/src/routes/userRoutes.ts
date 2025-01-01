
import express,{Request,Response} from "express";
import { getUserProfile, updateUserProfile } from "../controllers/userController";

const router = express.Router();

// Protected route - requires authentication
router.get(
    "/profile",
    async (req:Request, res: Response) => {
      try {
        await getUserProfile(req, res);
      } catch (error: unknown) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: "An unknown error occurred" });
        }
      }
    }
  );

  router.post(
    "/updateProfile",
    async (req:Request, res: Response) => {
      try {
        await updateUserProfile(req, res);
      } catch (error: unknown) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: "An unknown error occurred" });
        }
      }
    }
  );
export default router;
