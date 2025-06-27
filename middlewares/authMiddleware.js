// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const { isTokenBlacklisted } = require("../utils/tokenBlacklist");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token não fornecido ou malformado" });
  }

  const token = authHeader.split(" ")[1];
  req.token = token;                 // ARMAZENA O TOKEN PARA O LOGOUT
  if (isTokenBlacklisted(token)) {
    return res.status(401).json({ error: "Token inválido (logout)" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secreto");
    req.user = decoded;              // ID do usuário, etc.
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
};
