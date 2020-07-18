const db = require('../models');
const User = db.User;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const imgur = require("imgur-node-api");
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;

let userController = {
  signIn: (req, res) => {
    let username = req.body.email;
    let password = req.body.password;
    User.findOne({
      where: { email: username },
    }).then((user) => {
      if (!user)
        return res
          .status(401)
          .json({ status: "error", message: "No user was found." });

      if (!bcrypt.compareSync(password, user.password)) {
        return res
          .status(401)
          .json({ status: "error", message: "The password did not match." });
      }

      let payload = { id: user.id };
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      return res.json({
        status: "success",
        message: "OK",
        token: token,
        isAuthenticated: true,
        user: {
          id: user.id,
          name: user.name,
          profile_img: user.profile_img,
          age: user.age,
          email: user.email
        },
      });
    });
  },
  signUp: (req, res) => {
    const { files: files } = req

    if (req.body.password !== req.body.passwordCheck) {
      return res.json({
        status: "error",
        message: "Two Passwords do not match!",
      });
    }

    User.findOne({ where: { email: req.body.email } }).then((user) => {
      if (user) {
        return res.json({
          status: "error",
          message: "The email has already used!",
        });
      } else {
        if (files[0]) {
          imgur.setClientID(IMGUR_CLIENT_ID);
          imgur.upload(files[0].path, (err, img) => {
            User.create({
              name: req.body.name,
              profile_img: files[0]
                ? img.data.link
                : "https://picsum.photos/200",
              age: req.body.age,
              email: req.body.email,
              password: bcrypt.hashSync(
                req.body.password,
                bcrypt.genSaltSync(10),
                null
              ),
            }).then((user) => {
              return res.json({
                status: "success",
                message: "Register successfully!",
              });
            });
          });
        }else{
          User.create({
            name: req.body.name,
            profile_img: "https://picsum.photos/200",
            age: req.body.age,
            email: req.body.email,
            password: bcrypt.hashSync(
              req.body.password,
              bcrypt.genSaltSync(10),
              null
            ),
          }).then((user) => {
            return res.json({
              status: "success",
              message: "Register successfully!",
            });
          });
        }        
      }
    });
  },
  getCurrentUser: (req, res) => {
    // req.user is returned by passport-jwt
    const { user } = req

    let payload = { id: user.id };
    let token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.json({
      status: "success",
      message: "OK",
      token: token,
      isAuthenticated: true,
      user: {
        id: user.id,
        name: user.name,
        profile_img: user.profile_img,
        age: user.age,
        email: user.email,
      },
    });
  },
};

module.exports = userController;
