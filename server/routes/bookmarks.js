const express = require("express");
const router = express.Router();
const {handleAddBookmarks,handleAllBookmarks, handleRemoveBookmarks} = require('../controllers/bookmarks');
const isUserAuthenticate = require("../middlewares/userAuth");



router.get('/', isUserAuthenticate, handleAllBookmarks)
router.post('/add', isUserAuthenticate, handleAddBookmarks)
router.post('/remove', isUserAuthenticate, handleRemoveBookmarks)



module.exports = router