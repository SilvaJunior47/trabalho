const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middlewares globais
app.use(cors()); 
app.use(express.json()); 
app.use(express.static(path.join(__dirname, "views"))); 

// Rotas
const clientesRoutes = require("./routes/clientesRoutes");
const produtosRoutes = require("./routes/produtosRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");
const cacheMiddleware = require("./middlewares/cacheMiddleware");

// Aplica o cache apenas na rota GET de clientes
app.use("/clientes", cacheMiddleware, clientesRoutes);

app.use("/produtos", produtosRoutes);
app.use("/pedidos", pedidoRoutes);
app.use("/usuarios", usuariosRoutes);

// Iniciar servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
