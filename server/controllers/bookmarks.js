// backend/controllers/bookmarksController.js
const BookmarksModel = require('../models/bookmarks');
const UserModel = require('../models/user');

const handleAddBookmarks = async (req, res) => {
  const { userId } = req.user;
  const { sr, poster, title, type } = req.body;

  // Validate input
  if (!sr || !poster || !title || !type) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    // Check if the bookmark already exists
    const existingBookmark = await BookmarksModel.findOne({ user: userId, mediaId: sr });
    if (existingBookmark) {
      return res.status(409).json({ success: false, message: 'Bookmark already exists' });
    }

    // Validate user existence
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Create a new bookmark
    const newBookmark = new BookmarksModel({
      user: userId,
      mediaTitle: title,
      mediaId: sr,
      mediaType: type,
      mediaPoster: poster
    });

    // Save the bookmark
    await newBookmark.save();

    // Add the bookmark to the user's bookmarks array
    user.bookmarks.push(newBookmark._id);
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Bookmark added',
      bookmark: newBookmark
    });
  } catch (error) {
    console.error('Error while adding bookmark:', error);
    res.status(500).json({ success: false, message: 'Error while adding bookmark', error });
  }
};




const handleAllBookmarks = async (req, res) => {
  const { userId } = req.user;
  try {
    // Validate user existence
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Fetch bookmarks for the user
    const bookmarks = await BookmarksModel.find({ user: userId })

    res.status(200).json({
      success: true,
      bookmarks,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error while fetching bookmarks' });
  }
};


const handleRemoveBookmarks = async (req, res) => {
  const { userId } = req.user;
  const { orgId } = req.body;

  try {
    // Validate user existence
    const user = await UserModel.findById(userId);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Find the bookmark to remove
    const bookmark = await BookmarksModel.findById(orgId);
    if (!bookmark) {
      console.log('Bookmark not found');
      return res.status(404).json({ success: false, message: 'Bookmark not found' });
    }

    // Remove the bookmark
    await BookmarksModel.findByIdAndDelete(orgId);

    // Update the user's bookmarks array
    user.bookmarks = user.bookmarks.filter(bookmarkId => bookmarkId.toString() !== orgId);
    await user.save();
    
    // Fetch bookmarks for the user
    const bookmarks = await BookmarksModel.find({ user: userId })


    res.status(200).json({
      success: true,
      message: 'Bookmark removed successfully',
      bookmarks,
    });
  } catch (error) {
    console.error('Error removing bookmark:');
    res.status(500).json({ success: false, message: 'Error removing bookmark' });
  }
};







module.exports = { handleAddBookmarks,handleAllBookmarks, handleRemoveBookmarks };
