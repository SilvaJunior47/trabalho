// routes/logout.js
const express = require("express");
const router  = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { addTokenToBlacklist } = require("../utils/tokenBlacklist");

// POST /logout — invalida o token
router.post("/", authMiddleware, (req, res) => {
  // O authMiddleware já extraiu o token em req.token
  addTokenToBlacklist(req.token);
  res.json({ auth: false, message: "Logout efetuado" });
});

module.exports = router;
