import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { pool } from "../config/database";
import { sendOTP, verifyOTP } from "../utils/emailService";
const saltRounds = 10;

const hashPassword = async (password: string) => {
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
    console.dir(req.body);
    const [users]: any = await pool.query(
      "SELECT * FROM users WHERE email = ? and isVerified = 1",
      [email]
    );
    console.dir(users);
    if (users.length === 0) {
      console.log("User does not exist");
      return res.status(404).json({ error: "User does not exist" });
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);
    console.log("Valid Password:", validPassword);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }
    console.log("User:", user);
    if (!user.isVerified) {
      return res.status(403).json({ error: "Email not verified" });
    }
    console.log("User verified:", user.isVerified);
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "24h",
    });

    // Set token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    res.json({
      success: true,
      user: { id: user.id, email: user.email, username: user.username }
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

// Add a logout controller to clear the cookie
export const logout = async (req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ success: true, message: 'Logged out successfully' });
};
export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    
    // Log incoming request
    console.log('Signup request received:', { username, email });

    // Check for existing user
    const [existingUsers]: any = await pool.query(
      'SELECT * FROM users WHERE email = ?', 
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const hashedPassword = await hashPassword(password);

    // Insert new user
    const [result]: any = await pool.query(
      'INSERT INTO users (username, email, password, isVerified) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, false]
    );

    // Send OTP
    const otpSent = await sendOTP(email);

    return res.status(201).json({
      success: true,
      message: 'Registration successful. Please check your email for verification code.',
      userId: result.insertId
    });

  } catch (error: unknown) {
    console.error('Signup error:', error);
    return res.status(500).json({
      success: false,
      error: 'Registration failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const isValid = await verifyOTP(email, otp);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Update user verification status
    await pool.query(
      'UPDATE users SET isVerified = true WHERE email = ?',
      [email]
    );
    console.log('User verified:', email);

    res.json({ success:true,message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({success:false, error: 'Verification failed' });
  }
};


export const resendOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const [users]: any = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const otpSent = await sendOTP(email);
    if (!otpSent) {
      return res.status(500).json({ error: 'Failed to send verification email' });
    }

    res.json({ message: 'Verification code sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to resend verification code' });
  }
};


