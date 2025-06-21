const jwt = require("jsonwebtoken");
const blacklist = require("../utils/tokenBlacklist");

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "Token ausente" });

  const token = auth.split(" ")[1];
  if (blacklist.has(token))
    return res.status(401).json({ error: "Token invalidado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
};
