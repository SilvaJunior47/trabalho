const request = require("supertest");
const app = require("../app");

describe("Testes de validação dos campos de cliente", () => {
  it("deve recusar nome menor que 3 caracteres", async () => {
    const res = await request(app)
      .post("/clientes")
      .send({
        nome: "Jo",
        sobrenome: "Silva",
        email: "jo@exemplo.com",
        idade: 30
      });
    expect(res.statusCode).toBe(400);
  });

  it("deve recusar email inválido", async () => {
    const res = await request(app)
      .post("/clientes")
      .send({
        nome: "João",
        sobrenome: "Silva",
        email: "emailinvalido",
        idade: 30
      });
    expect(res.statusCode).toBe(400);
  });
});
