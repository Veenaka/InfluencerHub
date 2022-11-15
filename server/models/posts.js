const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  PostAuthor: {
    type: String,
    required: false,
  },
  PostAuthorID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  PostTopic: {
    type: String,
    required: true,
  },
  Postdescription: {
    type: String,
    required: true,
    trim: true,
  },
  PostCategory: {
    type: String,
    required: false,
  },
  PostImage: {
    type: String,
    required: false,
  },
});

const Post = mongoose.model("Posts", postSchema);
module.exports = { Post: Post };
