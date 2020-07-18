const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const multer = require("multer");
const upload = multer({ dest: "temp/" });
const userController = require("../controller/userController");
const jobRecordsController = require("../controller/jobRecordController");

// for authentication
const authenticated = passport.authenticate("jwt", { session: false });

// register, logIn, token validation
router.get(`/get_current_user`, authenticated, userController.getCurrentUser);
router.post("/signin", userController.signIn);
router.post("/signUp", upload.array('image'), userController.signUp);

router.get("/jobRecords", jobRecordsController.getJobRecords)

module.exports = router;
