const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Imund#$O.120", // sua senha do MySQL, se tiver
  database: "desafio" // <- aqui está o nome correto do seu banco
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  } else {
    console.log("Conectado ao banco de dados MySQL!");
  }
});

module.exports = connection;
