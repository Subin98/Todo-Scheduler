const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const todoSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
  notify: {
    type: Boolean,
  },
  phone: {
    type: Number,
  },
  recipientEmail: {
    type: String,
  },
  message: {
    type: String,
  },
  date: {
    type: Date,
  },
});
const todos = mongoose.model("todos", todoSchema);
module.exports = todos;
