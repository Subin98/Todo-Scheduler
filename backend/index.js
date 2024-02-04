const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const router = require("./routes/appRoutes");
const scheduleTask = require("./controllers/cloudSchedule");
const Port = process.env.PORT || 9000;
const App = express();

// Mandatory express Middlewares
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(cors());

// Routes
App.use("/", router);

// Configure db connection
const mongoDb =
  "mongodb+srv://subizubin98:2X6dI1z9lSJr86E2@cluster0.royqldx.mongodb.net/todoApp?retryWrites=true&w=majority";
mongoose
  .connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB:", mongoose.connection.name);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Listen to the server
App.listen(Port, (err) => {
  if (err) {
    console.error("Error connecting to server:", err);
  } else {
    console.log("Connected to server:", Port);
  }
});
//Task executes every 5 minutes
const scheduledJob = scheduleTask();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
console.log(accountSid, authToken);
