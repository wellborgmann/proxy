const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function handler(req, res) {
  const targetUrl = req.query.url; // Captura a URL do parâmetro "url"

  if (!targetUrl) {
    return res.status(400).send('Erro: Parâmetro "url" ausente');
  }

  const proxy = createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    secure: false,
    followRedirects: true,
    selfHandleResponse: true, // Permite manipular manualmente a resposta
    onProxyRes: (proxyRes, req, res) => {
      // Copia todos os cabeçalhos para manter a resposta original
      Object.keys(proxyRes.headers).forEach((key) => {
        res.setHeader(key, proxyRes.headers[key]);
      });

      // Força o download do arquivo
      if (!res.getHeader('Content-Disposition')) {
        res.setHeader('Content-Disposition', 'attachment');
      }

      // Stream da resposta para o cliente
      proxyRes.pipe(res);
    },
  });

  return proxy(req, res);
};
