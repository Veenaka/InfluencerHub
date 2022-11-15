const express = require("express");
const { Post } = require("../models/posts");
const router = express.Router();
const postValidation = require("../controller/post.validator");
const errorFunction = require("../../client/src/utilities/errorfunction");

//save posts
router.post("/post/save", postValidation, async (req, res) => {
  try {
    await Post.create({
      PostTopic: req.body.PostTopic,
      Postdescription: req.body.Postdescription,
      PostCategory: req.body.PostCategory,
      PostImage: req.body.PostImage,
      PostAuthorID: req.body.PostAuthorID,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error" });
    return res.json(errorFunction(true, "Error Creating Post"));
  }
});

//retrieve all posts
router.get("/posts/:id", (req, res) => {
  Post.find({ PostAuthorID: req.params.id }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

//get a specific post
router.get("/post/:id", (req, res) => {
  let postID = req.params.id;
  Post.findById(postID, (err, post) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      post,
    });
  });
});

//update post
router.put("/post/update/:id", (req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, post) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({ success: "Updated Successfully" });
    }
  );
});

//delete post
router.delete("/post/delete/:id", (req, res) => {
  Post.findByIdAndRemove(req.params.id).exec((err, deletedPost) => {
    if (err) {
      return res.status(400).json({
        message: "Delete unsuccessful",
        err,
      });
    }
    return res.json({
      message: "Delete successful",
      deletedPost,
    });
  });
});

module.exports = router;
