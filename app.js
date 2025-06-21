const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middlewares
app.use(cors()); // Libera acesso entre front e back-end
app.use(express.json()); // Permite ler JSON no body
app.use(express.static(path.join(__dirname, "views"))); // Serve o front-end

// Rotas
const clientesRoutes = require("./routes/clientesRoutes");
const produtosRoutes = require("./routes/produtosRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");
const cacheMiddleware = require("./middlewares/cacheMiddleware");

app.use(cacheMiddleware);
app.use("/clientes", clientesRoutes);
app.use("/produtos", produtosRoutes);
app.use("/pedidos", pedidoRoutes);
app.use("/usuarios", usuariosRoutes); // Essa rota deve vir antes do listen()

// Iniciar servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
