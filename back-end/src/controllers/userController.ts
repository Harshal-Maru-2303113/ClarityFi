import { Request, Response } from "express";
import { pool } from "../config/database";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import { Transaction } from "../models/userModel";

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

    console.dir(photoURL);

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

export const getUserTransactionData = async (req: Request, res: Response) => {
  try {
    const { start, limit } = req.body;

    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token missing",
      });
    }

    const decoded = jwt.decode(token);
    if (!decoded || typeof decoded !== "object" || !decoded.email) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }

    const email = decoded.email;

    const [transaction]: any = await pool.query(
      `
      SELECT 
        t.transaction_id,
        t.email,
        t.date_time,
        t.amount,
        t.transaction_type,
        t.description,
        t.subcategory_id,
        t.balance,
        sc.subcategory_name,
        sc.category_id,
        c.category_name
      FROM 
        transactions t
      LEFT JOIN 
        subcategories sc ON t.subcategory_id = sc.subcategory_id
      LEFT JOIN 
        categories c ON sc.category_id = c.category_id
      WHERE 
        t.email = ?
      ORDER BY 
        t.date_time DESC
      LIMIT ? OFFSET ?;
      `,
      [email, Number(limit), Number(start)]
    );

    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    console.error("Error fetching transaction data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching user transaction data",
    });
  }
};

export const addUserTransactionData = async (req: Request, res: Response) => {
  try {
    const { amount, transactionType, description, categoryId, subcategoryId } =
      req.body;
    const numAmount = Number(amount);
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token missing",
      });
    }
    const decoded = jwt.decode(token);
    if (!decoded || typeof decoded !== "object" || !decoded.email) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }
    const email = decoded.email;
    console.log(email);
    const latest_balance = await getLatestBalance(email);
    let balance = latest_balance?.balance ? parseFloat(latest_balance.balance) : 0;
    console.dir(latest_balance);
    let final_Sum:Number = 0;
      if (transactionType == "credit") {
        final_Sum = Number(balance) + numAmount;
      } else {
        final_Sum = Number(balance) - numAmount;
      }

    console.dir(final_Sum);

        const [result]: any = await pool.query(
          `
    INSERT INTO transactions (email, date_time, amount, transaction_type, description, subcategory_id, balance)
    VALUES (
      ?,
      NOW(),
      ?,
      ?,
      ?,
      ?,
      ?
    );

        `,
          [email, amount, transactionType, description, subcategoryId,String(final_Sum)]
        );

        console.dir(result);``
        if (result.affectedRows > 0) {
          console.log("Transaction added successfully!");
          res.status(200).json({
            success: true,
            message: "Transaction added successfully!",
          });
        } else {
          console.log("Transaction added unsuccessfully!");
          res.status(400).json({
            success: false,
            message: "Transaction added unsuccessfully!",
          });
        }
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({
      success: false,
      message: "Error adding transaction",
    });
  }
};

const getLatestBalance = async (email: string): Promise<Transaction | null> => {
  try {
    const [result]: any = await pool.query(
      `SELECT * 
FROM transactions 
WHERE email = ? 
ORDER BY date_time DESC;`,
      [email]
    );
    if (result.length === 0) {
      return null;
    }
    return result[0];
  } catch (error) {
    console.error("Error fetching latest balance:", error);
    throw error;
  }
};
