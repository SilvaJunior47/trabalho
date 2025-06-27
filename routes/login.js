// routes/login.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

const usuarioService = require("../services/usuariosService");
const { addTokenToBlacklist } = require("../utils/tokenBlacklist");

const SECRET = process.env.JWT_SECRET || "secreto";

// POST /login — autentica e retorna JWT
router.post("/", async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const user = await usuarioService.findByUsuario(usuario);

    if (!user) {
      return res.status(401).json({ error: "Usuário ou senha incorretos" });
    }

    const match = await bcrypt.compare(senha, user.senha);
    if (!match) {
      return res.status(401).json({ error: "Usuário ou senha incorretos" });
    }

    const token = jwt.sign({ id: user.id, usuario: user.usuario }, SECRET, {
      expiresIn: "1h",
    });

    res.json({ auth: true, token });
  } catch (error) {
    console.error("[ERRO NO LOGIN]", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

module.exports = router;
