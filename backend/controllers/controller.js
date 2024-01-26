const bcrypt = require("bcryptjs");
const workers = require("../models/worker");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
let jwtSecretKey = process.env.JWT_SECRET_KEY;
const getUsers = async (req, res) => {
  try {
    // const Email = req.params.email;
    const data = await workers.find({});
    if (data.length > 0) res.send(data);
    else res.send("User not found");
  } catch (e) {
    console.log("Error fetching data:", e);
    res.send(e);
  }
};

const addUser = async (req, res) => {
  try {
    let data = req.body;
    const duplicate = await workers.find({ email: data.email });
    if (duplicate.length === 0) {
      async function hashPassword(pwd) {
        const hash = await bcrypt.hash(pwd, 10);
        return hash;
      }
      const password = await hashPassword(data.password);
      data.password = password;
      let newUser = new workers(data);
      await newUser
        .save()
        .then((worker) => {
          console.log("Worker created:", worker);
          res.status(200).send(`Worker Created: ${worker.email}`);
        })
        .catch((e) => {
          res.status(400).send("Error creating user:", e);
        });
    } else {
      console.log("Error creating user");
      res.status(400).send("Error creating user:");
    }
  } catch (e) {
    console.log("Error creating user:", e);
  }
};
const checkEmail = async (req, res) => {
  try {
    const emailId = req.params.emailID;

    const data = await workers.find({ email: emailId });
    data.length > 0 ? res.status(200).send(true) : res.status(200).send(false);
  } catch (e) {
    console.log("Error:", e);
  }
};

const loginUser = async (req, res) => {
  try {
    const data = req.body;
    const worker = await workers.findOne({ email: data.email });
    if (worker != null) {
      console.log(worker);
      // compare password
      async function comparePassword(pwd, password) {
        const result = await bcrypt.compare(pwd, password);
        return result;
      }
      const validPassword = await comparePassword(
        data.password,
        worker?.password
      );
      if (validPassword) {
        console.log("user found");
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let payload = {
          userName: worker?.firstName,
          userId: worker?.email,
        };

        const Token = jwt.sign(payload, jwtSecretKey);
        const authentication = {
          userName: `${worker.firstName} ${worker.lastName}`,
          email: worker.email,
          token: Token,
        };
        res.status(200).send(authentication);
      } else res.status(200).send(false);
    } else {
      res.status(200).send(false);
    }
  } catch (e) {
    console.log("Error:", e);
  }
};

module.exports = {
  getUsers,
  addUser,
  checkEmail,
  loginUser,
};
