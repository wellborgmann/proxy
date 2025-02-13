const axios = require('axios');

export default async function handler(req, res) {
  const fileUrl = req.query.url;

  if (!fileUrl) {
    return res.status(400).send('Erro: Parâmetro "url" ausente');
  }

  try {
    const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename="lista.m3u"');
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Erro ao baixar o arquivo');
  }
}
