const mongoose = require("mongoose");


const bookmarksSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  mediaTitle: {
    type: String,
    required: true
  },
  mediaId: {
    type: String,
    required: true
  },
  mediaType: {
    type: String,
    required: true
  },
  mediaPoster: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Bookmarks = mongoose.model("Bookmarks", bookmarksSchema);

module.exports = Bookmarks;
