
import nodemailer from 'nodemailer';
import { pool } from '../config/database';
import crypto from 'crypto';


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const generateOTP = (): string => {
  return crypto.randomInt(100000, 999999).toString();
};

const saveOTP = async (email: string, otp: string): Promise<void> => {
  try {
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    
    // Log the attempt
    console.log('Attempting to save OTP:', { email, otp, expiresAt });

    const query = `
      INSERT INTO otp_records (email, otp, expires_at) 
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE 
      otp = VALUES(otp),
      expires_at = VALUES(expires_at)
    `;

    const [result] = await pool.query(query, [email, otp, expiresAt]);
    console.log('OTP save result:', result);
  } catch (error) {
    console.error('Database error while saving OTP:', error);
    throw new Error('Failed to save OTP');
  }
};

const verifyOTP = async (email: string, otp: string): Promise<boolean> => {
  try {
    const [records]: any = await pool.query(
      'SELECT * FROM otp_records WHERE email = ? AND otp = ? AND expires_at > NOW()',
      [email, otp]
    );
    
    console.log('Verification attempt:', { email, otp, found: records.length > 0 });
    
    if (records.length > 0) {
      await pool.query('DELETE FROM otp_records WHERE email = ?', [email]);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Verification error:', error);
    return false;
  }
};
const sendOTP = async (email: string): Promise<boolean> => {
  const otp = generateOTP();
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'ClarityFi - Email Verification Code',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Email Verification</h2>
        <p>Your verification code is: <strong>${otp}</strong></p>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this code, please ignore this email.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    await saveOTP(email, otp);

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export { sendOTP, verifyOTP };
