const express = require("express");
const cors = require("cors");
const {
  getUsers,
  addUser,
  checkEmail,
  loginUser,
} = require("../controllers/controller");
const {
  getTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodoById,
} = require("../controllers/todoController");
const jwt = require("jsonwebtoken");
const router = express.Router();
// Middleware for JWT verification
const verifyToken = (req, res, next) => {
  try {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      console.log("NO TOKEN");
      return res.status(200).send(false);
    }

    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      console.log("Access granted");
      return next();
    } else {
      // Access Denied
      console.log("Access Denied");
      return res.status(200).send(false);
    }
  } catch (error) {
    // Access Denied
    console.log("unexpected error", error);
    return res.status(200).send(false);
  }
};
router.route("/").get((req, res) => {
  res.send("HELLO... Yes! This is Home page");
});

router.route("/workers").get(cors(), getUsers);

router.route("/signup").post(addUser);

router.route("/checkEmail/:emailID").get(checkEmail);

router.route("/login").post(loginUser);

router.route("/todos/:emailID").get(verifyToken, getTodos);
router.route("/create-todo").post(verifyToken, createTodo);
router.route("/update-todo").post(verifyToken, updateTodo);
router.route("/get-todo/:todoId").get(verifyToken, getTodo);
router.route("/delete-todo/:todoId").delete(verifyToken, deleteTodoById);

module.exports = router;
