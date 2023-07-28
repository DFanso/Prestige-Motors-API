import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import restorationRoutes from './routes/restorationRoutes';
import dotenv from 'dotenv';




const app = express();
const port = 3000;

require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI!, { retryWrites: true, w: "majority" })
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.log("Error connecting to MongoDB:", error));

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/restoration', restorationRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


