// routes/usuariosRoutes.js
const express = require("express");
const router = express.Router();

const usuariosController = require("../controllers/usuariosController");
const authMiddleware     = require("../middlewares/authMiddleware");

// POST /usuarios/register — cadastra um usuário (público)
router.post("/register", usuariosController.createUser);

// GET  /usuarios/list     — lista todos os usuários (protegido)
router.get("/list", authMiddleware, usuariosController.listUsers);

module.exports = router;
