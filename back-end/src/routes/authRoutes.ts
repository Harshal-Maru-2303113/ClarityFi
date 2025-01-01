import express,{ Request,Response } from 'express';
import { login, signup } from '../controllers/authController';


const router = express.Router();


router.post('/login', async (req: Request, res: Response) => {
    try {
    await login(req, res);    
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  });  

  router.post('/signup', async (req: Request, res: Response) => {
    try {
    await signup(req, res);    
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  });  

export default router;