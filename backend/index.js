const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoute = require("./routes/user");

const app = express();
mongoose.set("strictQuery", false);
const PORT = process.env.PORT || 8000;

// -----------------Middle wares ---------------
app.use(cors());
app.use(express.json());
dotenv.config();

// --------------Connect to MongoDb ------------
const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Connected to MongoDB Successfully");
    })
    .catch((err) => {
      throw err;
    });
};

// ----------Routes -----------

app.use('/api/user', userRoute)

// -------------Listening to port

app.listen(PORT, () => {
  connect();
  console.log("The backend server is running successfully!!");
});
