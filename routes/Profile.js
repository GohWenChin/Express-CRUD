const express = require("express");
const router = express.Router();

const { 
    CreateProfile,
    GetAllProfiles,
    GetProfileByID,
    UpdateProfile,
    DeleteProfile 
} = require("../controllers/Profile");


router.post('/create', CreateProfile);
router.get("/all", GetAllProfiles);
router.get("/byId/:id", GetProfileByID);
router.put("/update/:id", UpdateProfile);
router.delete("/:id", DeleteProfile);

module.exports = router;
