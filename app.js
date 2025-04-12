const express = require("express");
const cors = require("cors"); // MOVA isso para cima

const path = require("path"); // Também precisa importar o path!

const app = express();

// Permite acesso entre front e back
app.use(cors());

// Permite ler JSON no body
app.use(express.json());

// Permite acessar a pasta "views" via navegador
app.use(express.static(path.join(__dirname, "views")));

// Rotas
const clientesRoutes = require("./routes/clientesRoutes");
const produtosRoutes = require("./routes/produtosRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");

app.use("/clientes", clientesRoutes);
app.use("/produtos", produtosRoutes);
app.use("/pedidos", pedidoRoutes);

// Iniciar servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
