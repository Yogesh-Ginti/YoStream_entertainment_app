const express = require("express");
const router = express.Router();
const {handleAddBookmarks,handleAllBookmarks, handleRemoveBookmarks} = require('../controllers/bookmarksControllers.js.js');
const isUserAuthenticate = require("../middlewares/userAuth.js");



router.get('/', isUserAuthenticate, handleAllBookmarks)
router.post('/add', isUserAuthenticate, handleAddBookmarks)
router.post('/remove', isUserAuthenticate, handleRemoveBookmarks)



module.exports = router