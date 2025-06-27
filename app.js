// app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "views")));

// Rotas de autenticação
const loginRouter  = require("./routes/login");
const logoutRouter = require("./routes/logout");

// Outras rotas
const clientesRoutes = require("./routes/clientesRoutes");
const produtosRoutes = require("./routes/produtosRoutes");
const pedidoRoutes   = require("./routes/pedidoRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");

// Middlewares específicos
const authMiddleware  = require("./middlewares/authMiddleware");
const cacheMiddleware = require("./middlewares/cacheMiddleware");

// Endpoint raiz
app.get("/", (req, res) => {
  res.status(200).send("Bem-vindo à API do Desafio Final!");
});

// Login / Logout
app.use("/login",  loginRouter);
app.use("/logout", logoutRouter);

// Rotas públicas
app.use("/produtos", produtosRoutes);
app.use("/pedidos",   pedidoRoutes);
app.use("/usuarios", usuariosRoutes);

// Rotas protegidas: autenticação + cache
app.use("/clientes", authMiddleware, cacheMiddleware, clientesRoutes);

// Só inicia servidor se executado diretamente (não durante testes)
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
}

module.exports = app;
