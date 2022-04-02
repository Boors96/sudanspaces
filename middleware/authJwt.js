const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../models");
const User = db.User;

verifyToken = (req, res) => {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.redirect('login').status(403).send({
        message: "No token provided!"
      });
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.redirect('login').status(401).send({
          message: "Unauthorized!"
        });
      }
      req.userId = decoded.id;
    });
};

const authJwt = {
    verifyToken: verifyToken
  };
  module.exports = authJwt;
