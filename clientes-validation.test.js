const request = require("supertest");
const app = require("../app");

// Função para gerar email único
const generateUniqueEmail = (prefix = "teste") => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `${prefix}_${timestamp}_${random}@exemplo.com`;
};

describe("Testes de validação dos campos de cliente", () => {
  
  it("deve recusar nome menor que 3 caracteres", async () => {
    const res = await request(app)
      .post("/clientes")
      .send({
        nome: "Jo", // Nome muito curto
        sobrenome: "Silva",
        email: generateUniqueEmail("nome_curto"),
        idade: 25
      })
      .timeout(15000);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  }, 20000);

  it("deve recusar email inválido", async () => {
    const res = await request(app)
      .post("/clientes")
      .send({
        nome: "João",
        sobrenome: "Silva",
        email: `emailinvalido_${Date.now()}`, // Email sem @ e domínio
        idade: 25
      })
      .timeout(15000);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  }, 20000);

  it("deve recusar idade menor que 18", async () => {
    const res = await request(app)
      .post("/clientes")
      .send({
        nome: "João",
        sobrenome: "Silva",
        email: generateUniqueEmail("idade_menor"),
        idade: 17 // Menor de idade
      })
      .timeout(15000);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  }, 20000);

  it("deve recusar campos obrigatórios vazios", async () => {
    const res = await request(app)
      .post("/clientes")
      .send({
        nome: "",
        sobrenome: "",
        email: "",
        idade: null
      })
      .timeout(15000);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  }, 20000);

  it("deve aceitar dados válidos", async () => {
    const clienteValido = {
      nome: "João",
      sobrenome: "Silva",
      email: generateUniqueEmail("valido"),
      idade: 25
    };

    const res = await request(app)
      .post("/clientes")
      .send(clienteValido)
      .timeout(15000);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.email).toBe(clienteValido.email);
  }, 20000);

  it("deve recusar email duplicado", async () => {
    const emailComum = generateUniqueEmail("duplicado");
    
    // Primeiro cliente
    await request(app)
      .post("/clientes")
      .send({
        nome: "João",
        sobrenome: "Silva",
        email: emailComum,
        idade: 25
      });

    // Segundo cliente com mesmo email
    const res = await request(app)
      .post("/clientes")
      .send({
        nome: "Maria",
        sobrenome: "Santos",
        email: emailComum, // Email duplicado
        idade: 30
      })
      .timeout(15000);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  }, 20000);
});