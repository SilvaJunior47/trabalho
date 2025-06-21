const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", usuariosController.createUser);
router.post("/login", usuariosController.login);
router.post("/logout", authMiddleware, usuariosController.logout);
router.get("/list", authMiddleware, usuariosController.listUsers);

module.exports = router;
