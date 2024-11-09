//req handler for user/author reg
require("dotenv").config();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const createUserAuthor = async (req, res) => {
  //get users or authors collection object
  const usersCollectionObj = req.app.get("usersCollection");
  const authorsCollectionObj = req.app.get("authorsCollection");

  //get user/author
  const user = req.body;
  //check duplicate user
  if (user.usertype === "user") {
    let dbuser = await usersCollectionObj.findOne({ username: user.username });
    if (dbuser !== null) {
      return res.send({ message: "User already existed" });
    }
  }
  //check duplicate author
  if (user.usertype === "author") {
    let dbuser = await authorsCollectionObj.findOne({
      username: user.username,
    });
    if (dbuser !== null) {
      return res.send({ message: "Author already existed" });
    }
  }

  // if user and password are valid
  //hash password
  const hashedPassword = await bcryptjs.hash(user.password, 7);
  //replace plain password with hashed password
  user.password = hashedPassword;
  //save in collections
  //save user
  if (user.usertype === "user") {
    await usersCollectionObj.insertOne(user);
    res.send({ message: "User Created" });
  }
  //save password
  if (user.usertype === "author") {
    await authorsCollectionObj.insertOne(user);
    res.send({ message: "Author Created" });
  }

  //send resp
};

const userAuthorLogin = async (req, res) => {
  //get users or authors collection object
  const usersCollectionObj = req.app.get("usersCollection");
  const authorsCollectionObj = req.app.get("authorsCollection");

  //get user/author Credintials
  const userCred = req.body;
  //verify username
  if (userCred.usertype === "user") {
    let dbuser = await usersCollectionObj.findOne({
      username: userCred.username,
    });
    if (dbuser === null) {
      return res.send({ message: "invalid user" });
    } else {
      let status = await bcryptjs.compare(userCred.password, dbuser.password);
      if (status === false) {
        return res.send({ message: "invalid user passsword" });
      } else {
        //create token
        const signedToken = jwt.sign(
          { username: dbuser.username },
          SECRET_KEY,
          { expiresIn: "1d" }
        );
        delete dbuser.password;
        res.send({
          message: "login success",
          token: signedToken,
          user: dbuser,
        });
      }
    }
  }

  //verify authername
  if (userCred.usertype === "author") {
    let dbuser = await authorsCollectionObj.findOne({
      username: userCred.username,
    });
    if (dbuser === null) {
      return res.send({ message: "invalid author" });
    } else {
      let status = await bcryptjs.compare(userCred.password, dbuser.password);
      if (status === false) {
        return res.send({ message: "invalid author passsword" });
      } else {
        //create token
        const signedToken = jwt.sign(
          { username: dbuser.username },
          SECRET_KEY,
          { expiresIn: "1d" }
        );
        delete dbuser.password;
        res.send({
          message: "login success",
          token: signedToken,
          user: dbuser,
        });
      }
    }
  }
};
module.exports = { createUserAuthor, userAuthorLogin };
