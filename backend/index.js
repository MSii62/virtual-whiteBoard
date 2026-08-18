require('dotenv').config();
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
const cors = require('cors');

const express = require('express');
const connectToDatabasee=require('./db');
const canvasRoute=require('./routes/canvasRoutes')
const userRoute=require('./routes/userRoutes')
const app = express();
connectToDatabasee();

app.use(cors());  // Enable CORS for all routes and origins
app.use(express.json());
app.use('/users',userRoute);
app.use('/api/canvas',canvasRoute)


const PORT=process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

