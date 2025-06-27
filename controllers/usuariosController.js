// controllers/usuariosController.js
const usuariosService = require("../services/usuariosService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blacklist = require("../utils/tokenBlacklist");

const createUser = async (req, res) => {
  const { usuario, senha } = req.body;
  await usuariosService.create(usuario, senha); // <<< sem hash aqui
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

const { addTokenToBlacklist } = require("../middlewares/tokenBlacklist");

const logout = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(400).json({ message: "Token não encontrado" });

  addTokenToBlacklist(token);
  res.status(200).json({ message: "Logout realizado com sucesso" });
};

module.exports = {
  createUser,
  listUsers,
  login,
  logout
};
