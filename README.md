# 🚀 Desafio Final - Back-End I e II

## 📚 Descrição

Projeto completo de API RESTful para gerenciamento de **clientes**, **produtos**, **pedidos** e **usuários**, com autenticação via JWT, middleware de cache, validação de dados, blacklist de tokens e testes automatizados.

Inclui ainda uma interface web simples em HTML para simular requisições e facilitar testes manuais.

Desenvolvido com:

- **Node.js**
- **Express**
- **MySQL**
- **Jest**
- **Supertest**
- **dotenv**
- **Node-Cache**

---

## 📁 Estrutura do Projeto

/controllers → Lógica das rotas
/database → Conexão com o banco de dados
/middlewares → Middlewares globais e de validação
/routes → Definição das rotas da API
/utils → Utilitários como blacklist de token
/views → Páginas HTML para teste manual da API
/tests → Testes automatizados com Jest e Supertest

---

## ⚙️ Pré-requisitos

- Node.js instalado (v18 ou superior)
- MySQL Server rodando localmente
- Editor de código (VSCode recomendado)

---

## 🧪 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/SilvaJunior47/trabalho.git
cd trabalho