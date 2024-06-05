const express = require("express");
const router = express.Router();
const { handleSignUp, handleLogin, handleLogout } = require("../controllers/userControllers");


router.get('/', (req, res)=>{
  res.send("go ahead")
})
// Route to register
router.post('/signup', handleSignUp);
// Route to Login
router.post('/login', handleLogin);
// Route to Logout
router.post('/logout', handleLogout);



module.exports = router;
