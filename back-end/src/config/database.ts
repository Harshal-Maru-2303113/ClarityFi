import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'clarityfi',
  waitForConnections: true,
});


const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to the database!');
    connection.release();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

testConnection();

export { pool };