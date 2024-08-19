const express = require("express");
const createError = require("http-errors");

const postsUseCases = require("../usecases/posts.usecase");
const auth = require("../middlewares/auth");

const router = express.Router();


router.post("/", auth, async (req, res) => {
  try {
    const data = req.body;
    data.user = req.user._id;
    const post = await postsUseCases.create(data);

    res.json({
      success: true,
      message: "Post created",
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message,
    });
  }
});


router.get("/", async (req, res) => {
  try {
    const search = req.query.search || "";
    const posts = await postsUseCases.getAll({ search });

    res.json({
      success: true,
      message: "Posts found",
      data: {
        posts,
      },
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message,
    });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postsUseCases.getById(id);

    if (!post) {
      throw createError(404, "Post not found");
    }

    res.json({
      success: true,
      message: "Post found",
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message,
    });
  }
});


router.patch("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    delete newData.user; 
    const post = await postsUseCases.update(id, newData);

    res.json({
      success: true,
      message: "Post updated",
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message,
    });
  }
});


router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postsUseCases.remove(id, req.user._id);

    res.json({
      success: true,
      message: "Post deleted",
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message,
    });
  }
});
