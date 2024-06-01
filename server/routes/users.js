const express = require("express");
const router = express.Router();
const { handleSignUp, handleLogin, handleLogout, handleprofile } = require("../controllers/user");
const isUserAuthenticate = require("../middlewares/userAuth");


// Route to register
router.post('/signup', handleSignUp);
router.post('/login', handleLogin);
router.post('/logout', handleLogout);
// router.get('/profile', isUserAuthenticate, handleprofile);



module.exports = router;
