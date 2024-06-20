const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const predictRoute = require("./src/routes/predict.route");
const userRoute = require('./src/routes/user.route');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api/predict", predictRoute);
app.use('/api', userRoute);

// Connect to database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Cannot connect to the database!", error);
  });
