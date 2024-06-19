const express = require('express');
const cors = require('cors');
const moment=require("moment-timezone")
const mongoose = require('mongoose');
const path = require('path');
const User = require('./userModel'); // Import User model
const Message = require('./messageModel'); // Import Message model
require("dotenv").config()

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb+srv://ngdec03:70mSLFgLFj9Xm9cV@chatifly.hwr1och.mongodb.net/chatzia");




app.post("/registerUser", async (req, res) => {
  const { userName } = req.body;
  try {
    const existingUser = await User.findOne({ userName: userName });
    if (existingUser) {
      return res.json({ message: "User Already Exists" });
    }
    const newUser = await User.create({ userName: userName });
    res.json({ message: "User Created Successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

app.post("/setMessage", async (req, res) => {
  const { userName, message } = req.body;
  console.log(userName, message);
  try {
    const newMessage = await Message.create({
      message: message,
      userName: userName,
      sentAt:moment().tz("Asia/Kolkata").format("HH:mm:ss")
    });
    res.json({ message: "Message Sent Successfully" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

app.post("/fetchMessage", async (req, res) => {
  // const { userName } = req.body;
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
