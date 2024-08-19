const express = require("express");
const createError = require("http-errors");

const usersUseCases = require("../usecases/users.usecase");

const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    const data = req.body;
    const token = await usersUseCases.login(data);

    res.json({
      success: true,
      message: "Logged",
      data: {
        token,
      },
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message,
    });
  }
  next();
});

module.exports = router;
