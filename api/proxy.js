const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function handler(req, res) {
  // Pega o parâmetro da URL 'url' da query string
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send('URL missing in query parameter');
  }

  const proxy = createProxyMiddleware({
    target: targetUrl,  // Define a URL de destino como a URL fornecida na query
    changeOrigin: true,
    secure: false,  // Desabilitar validação SSL (útil em ambientes de desenvolvimento)
    onProxyRes: (proxyRes, req, res) => {
      // Copiar cabeçalhos de resposta do servidor de destino
      res.setHeader('Content-Type', proxyRes.headers['content-type']);
      res.setHeader('Content-Disposition', proxyRes.headers['content-disposition']);
    },
  });

  return proxy(req, res);
};
