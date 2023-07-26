import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';


const app = express();
const port = 3000;

require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI!, { retryWrites: true, w: "majority" })
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.log("Error connecting to MongoDB:", error));

// Middleware
app.use(bodyParser.json());




// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});