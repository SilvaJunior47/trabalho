const jwt = require("jsonwebtoken");
const { isTokenBlacklisted } = require("../utils/tokenBlacklist");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token não fornecido" });

  const token = authHeader.split(" ")[1];
  if (isTokenBlacklisted(token)) {
    return res.status(401).json({ error: "Token inválido (logout)" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
};

module.exports = authMiddleware;
