import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../config/database';
import { error } from 'console';
const saltRounds = 10

const hashPassword = async (password:string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("Hashed Password:", hashedPassword);
    return hashedPassword; // Store this hashed password in your database
  } catch (err) {
    console.error("Error hashing password:", err);
    return "";
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const [users]: any = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
        console.log('User does not exist')
      return res.status(404).json({ error: 'User does not exist' });
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    if (!user.isVerified) {
      return res.status(403).json({ error: 'Email not verified' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '24h' });
    
    res.json({ token, user: { id: user.id, email: user.email, username: user.username } });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};



export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password,confirmPassword } = req.body;
    
    const [existingUsers]: any = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (existingUsers.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    res.status(201).json({success:true,username:username,email:email,password:hashedPassword})
    // const [result]: any = await pool.query(
    //   'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    //   [username, email, hashedPassword]
    // );

    // if (result.affectedRows > 0) {
    //   res.status(201).json({ 
    //     success: true, 
    //     message: 'User created successfully',
    //     userId: result.insertId 
    //   });
    // } else {
    //   res.status(500).json({ error: 'Failed to create user' });
    // }

  } catch (error) {
    res.status(500).json({ error: 'Signup failed' });
  }
};

export const verify = async (req:Request,res:Response)=>{
  res.send(req);
}