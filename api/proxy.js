const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
app.use(cors()); // Habilita CORS para evitar bloqueios no navegador

app.get('/proxy', (req, res) => {
  const fileUrl = req.query.url;

  if (!fileUrl) {
    return res.status(400).send('Erro: Parâmetro "url" ausente');
  }

  console.log(`Baixando: ${fileUrl}`);

  // Faz a requisição para o servidor HTTP e redireciona o conteúdo
  request
    .get(fileUrl)
    .on('error', (err) => res.status(500).send(`Erro ao baixar: ${err.message}`))
    .pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
