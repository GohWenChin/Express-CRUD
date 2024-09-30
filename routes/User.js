const express = require("express");
const router = express.Router();

const { 
    CreateUser,
    GetAllUsers,
    GetUserByID,
    UpdateUser,
    DeleteUser 
} = require("../controllers/User");

router.post('/create', CreateUser);
router.get("/all", GetAllUsers);
router.get("/byId/:id", GetUserByID);
router.put("/update/:id", UpdateUser);
router.delete("/:id", DeleteUser);


router.get('/', (req, res) => {
    res.send('List of users');
  });

module.exports = router;
