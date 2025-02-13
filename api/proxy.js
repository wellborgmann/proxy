const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send('URL missing in query parameter');
  }

  const proxy = createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    secure: false,
    followRedirects: true,
    onProxyRes: (proxyRes, req, res) => {
      // Copiar o Content-Type correto
      const contentType = proxyRes.headers['content-type'];
      res.setHeader('Content-Type', contentType);

      // Se o conteúdo for um arquivo para download, pode ser necessário manipular o Content-Disposition
      const contentDisposition = proxyRes.headers['content-disposition'];
      if (contentDisposition) {
        res.setHeader('Content-Disposition', contentDisposition);
      }

      // Verificar e manipular codificação, se necessário
      if (contentType && contentType.includes('application/octet-stream')) {
        // Caso seja um arquivo binário (ex: .m3u ou .mp4), processar adequadamente
        res.setHeader('Content-Encoding', 'binary');
      }
    },
  });

  return proxy(req, res);
};
