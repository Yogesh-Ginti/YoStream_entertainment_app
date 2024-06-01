const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true, 
  },
  password: {
    type: String,
    required: true, 
  },
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Bookmark' //  referenced model is 'Bookmark'
    }
  ]
}, { timestamps: true }); 

const User = mongoose.model('User', userSchema);
module.exports = User;
