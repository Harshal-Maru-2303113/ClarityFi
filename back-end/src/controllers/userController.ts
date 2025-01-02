import { Request, Response } from "express";
import { pool } from "../config/database";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const decoded = jwt.decode(req.cookies.token);
    if (!decoded || typeof decoded !== "object") {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }

    const userId = decoded.userId;
    console.log("Decoded JWT:", decoded);
    console.log("User ID:", userId);

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const [users]: any = await pool.query(
      "SELECT username, email, age, gender,photoURL FROM users WHERE id = ?",
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = users[0];
    return res.status(200).json({
      success: true,
      user: {
        username: user.username,
        email: user.email,
        age: user.age,
        gender: user.gender,
        photoURL: user.photoURL,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching user profile",
    });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    console.dir(req.body);
    const { username, age, gender, photoURL, email } = req.body;
    
    console.dir(photoURL)

    const [result]: any = await pool.query(
      "UPDATE users SET username =?,age = ?, gender=?,photoURL =? WHERE email = ?",
      [username, age, gender, photoURL, email]
    );

    console.dir(result);
    console.log(result.affectedRows);
    if (result.affectedRows > 0) {
      console.log("profile updated successfully");
      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
      });
    } else {
      console.log("profile updated unsuccessfully");
      return res.status(400).json({
        success: false,
        message: "Profile update failed",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error updating user profile",
    });
  }
};
