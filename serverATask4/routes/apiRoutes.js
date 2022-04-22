const express = require("express");
const moderationQueue = require("../queue/moderationQueue");
const communicationQueue = require("../queue/communicationQueue");
const discordQueue = require("../queue/discordQueue");
const Blog = require("../dbConnection/blogSchema");
const router = express.Router();

router.post("/page", async (req, res) => {
  try {
    const source = "Blog";
    const newBlogComment = new Blog({
      comment: req.body.comment,
    });
    const data = await newBlogComment.save();
    await moderationQueue(data, source);
    return res.send({ message: "comment is posted successfully" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/comments", async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const comments = await Blog.find({})
      .limit(limit * 1)
      .skip((page - 1) * limit);
    return res.json(comments);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Blog.findOneAndDelete({ _id: id });
    const data = {
      message:
        "User A has violated post safety and post has been removed, please notify user to desist from profane words e.g fuck, pussy, ass etc.",
    };
    await communicationQueue(data);
  } catch (error) {
    res.status(404).send(error);
  }
});
module.exports = router;
