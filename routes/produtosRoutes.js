// Arquivo de configura��o do banco de dados 
const express = require("express");
const router = express.Router();

const produtoController = require("../controllers/produtoController");
const { validatePrice } = require("../middlewares/precoMiddleware");
router.post("/", validatePrice, produtoController.save);

router.get("/", produtoController.findAll);
router.post("/", produtoController.save);
router.put("/", produtoController.update);
router.delete("/:id", produtoController.remove);

module.exports = router;
