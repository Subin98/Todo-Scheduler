const todos = require("../models/todos");
const getTodos = async (req, res) => {
  try {
    const email = req.params.emailID;
    const userTodos = await todos
      .find({ userEmail: email })
      .sort({ completed: 1 });

    res.status(200).send(userTodos);
  } catch (e) {
    res.status(200).send(false);
    console.log(e);
  }
};

const createTodo = async (req, res) => {
  try {
    const data = req.body;
    const todoValues = {
      title: data.title,
      description: data.description,
      userEmail: data.userEmail,
      completed: data.completed,
      notify: data.notify,
      phone: data.phoneNumber,
      recipientEmail: data.email,
      message: data.message,
      date: data.dateTime,
    };

    const todo = new todos(todoValues);
    await todo
      .save()
      .then(() => {
        res.status("200").send(true);
      })
      .catch((e) => {
        console.log(e);
        res.status("200").send(false);
      });
  } catch (e) {
    console.log(e);

    res.status("200").send(false);
  }
};

const updateTodo = async (req, res) => {
  try {
    const data = req.body;
    const todoValues = {
      title: data.title,
      description: data.description,
      userEmail: data.userEmail,
      completed: data.completed,
      notify: data.notify,
      phone: data.phoneNumber,
      recipientEmail: data.email,
      message: data.message,
      date: data.dateTime,
    };

    await todos
      .findOneAndUpdate({ _id: data.todoId }, { $set: todoValues })
      .then((doc) => {
        res.status(200).send(true);
      })
      .catch((e) => {
        console.log(e);
        res.status(200).send(false);
      });
  } catch (e) {
    console.log(e);

    res.status(200).send(false);
  }
};

const getTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const todo = await todos.find({ _id: todoId });
    res.status("200").send(todo);
  } catch (e) {
    console.log(e);

    res.status("200").send(false);
  }
};

const deleteTodoById = async (req, res) => {
  console.log("deleting.........");
  try {
    const todoId = req.params.todoId;
    const todo = await todos.deleteOne({ _id: todoId });
    console.log(todo);
    res.status(200).send(todo.acknowledged);
  } catch (e) {
    console.log(e);
    res.status(200).send(false);
  }
};
module.exports = {
  getTodos,
  updateTodo,
  createTodo,
  getTodo,
  deleteTodoById,
};
