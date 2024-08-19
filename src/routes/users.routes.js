const express = require("express");
const createError = require("http-errors");

const usersUseCases = require("../usecases/users.usecase");

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const user = await usersUseCases.signup(data);

    res.json({
      success: true,
      message: "Usuario Creado",
      data: {
        user,
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
    const user = await usersUseCases.getById(id);

    if (!user) {
      throw createError(404, "Usuario no encontrado");
    }
    res.json({
      success: true,
      message: "Usuario encontrado",
      data: {
        user,
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

module.exports = router;
