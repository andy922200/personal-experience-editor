const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const multer = require("multer");
const upload = multer({ 
  dest: "temp/",
  limits: {
    fileSize: 1024 * 1024 * 3
  },
  fileFilter(req, file, cb){
    if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
      cb(new Error('Please upload an image'))
    }
    cb(null, true)
  }
});
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
router.get("/jobRecords/browse/by/user:userId", jobRecordsController.getJobRecords);
router.get("/jobRecords/browse/record:recordId", authenticated, jobRecordsController.getOneJobRecord);
router.post("/jobRecords/create/by:userId", authenticated, upload.array('company_logo'),jobRecordsController.postOneJobRecord);
router.put("/jobRecords/edit/:recordId", authenticated, upload.array('company_logo'), jobRecordsController.putOneJobRecord);
router.delete("/jobRecords/delete/:recordId", authenticated, jobRecordsController.deleteOneJobRecord);
module.exports = router;
