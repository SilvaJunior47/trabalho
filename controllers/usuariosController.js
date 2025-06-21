// controllers/usuariosController.js
const usuariosService = require("../services/usuariosService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blacklist = require("../utils/tokenBlacklist");

const createUser = async (req, res) => {
  const { usuario, senha } = req.body;
  const hashed = await bcrypt.hash(senha, 10);
  await usuariosService.create(usuario, hashed);
  res.status(201).json({ message: "Usuário criado" });
};

const listUsers = async (req, res) => {
  const users = await usuariosService.findAll();
  res.json(users);
};

const login = async (req, res) => {
  const { usuario, senha } = req.body;
  const user = await usuariosService.findByUsuario(usuario);

  if (!user || !(await bcrypt.compare(senha, user.senha))) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
};

const logout = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  blacklist.add(token);
  res.json({ message: "Logout realizado com sucesso" });
};

module.exports = {
  createUser,
  listUsers,
  login,
  logout
};
