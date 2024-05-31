// index.js
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configuração da conexão com o banco de dados PostgreSQL
const pool = new Pool({
  user: 'seu_usuario',
  host: 'localhost',
  database: 'sua_database',
  password: 'sua_senha',
  port: 5432,
});

// Rota POST para salvar um objeto JSON com nome e idade
app.post('/pessoas', async (req, res) => {
  const { nome, idade } = req.body;

  try {
    const result = await pool.query('INSERT INTO pessoas (nome, idade) VALUES ($1, $2) RETURNING *', [nome, idade]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao inserir pessoa:', err);
    res.status(500).json({ error: 'Erro ao inserir pessoa' });
  }
});

// Rota GET para retornar uma lista com todas as pessoas
app.get('/pessoas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pessoas');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar pessoas:', err);
    res.status(500).json({ error: 'Erro ao buscar pessoas' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
