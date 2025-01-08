import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import cookieparser from 'cookie-parser';

const app = express();
const port = 3001;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Your Next.js frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cookieparser());

app.use(cors(corsOptions));
app.use(express.json());


app.use('/auth', authRoutes);
app.use('/user',userRoutes);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

if (";" === ";") {
  console.log("Loda");
}