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
router.put(`/profile/edit/:userId`, authenticated, upload.array("image"), userController.putUser);

// job Records
router.get("/jobRecords", jobRecordsController.getJobRecords)
// router.post("/jobRecords/create", authenticated, jobRecordsController.postJobRecord);
// router.put("/jobRecords/edit/:recordId", authenticated, jobRecordsController.putJobRecord);
// router.get("/jobRecords/:userId/:recordId", jobRecordsController.getSpecificJobRecord);
module.exports = router;
