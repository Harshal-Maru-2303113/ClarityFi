import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';

const app = express();
const port = 3001;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Your Next.js frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/auth', authRoutes);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
