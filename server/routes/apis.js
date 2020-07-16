const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const multer = require("multer");
const upload = multer();
const userController = require("../controller/userController");

// for authentication
const authenticated = passport.authenticate("jwt", { session: false });

// register, logIn, token validation
// router.get(`/get_current_user`, authenticated, userController.getCurrentUser);
router.post("/signin", userController.signIn);
// router.post("/signUp", userController.signUp);

module.exports = router;
