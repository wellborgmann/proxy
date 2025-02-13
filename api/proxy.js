const { createProxyMiddleware } = require("http-proxy-middleware"); 
const { createServer } = require("http");
const https = require("https");
const http = require("http");
const path = require("path");
const httpServer = createServer(app);
const bodyParser = require("body-parser");


app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" })); // Certifique-se de que esta linha também esteja presente

app.use("/download", (req, res, next) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send("A URL de destino não foi fornecida.");
  }

  req.proxyUrl = targetUrl;
  next();
});

app.use(
  "/download",
  createProxyMiddleware({
    changeOrigin: true,
    pathRewrite: (path, req) => {
      // Reescreva o caminho removendo o "/download"
      const newPath = req.proxyUrl.replace(/^\/download/, "");
      return newPath;
    },
    router: (req) => {
      // Define a URL de destino dinamicamente
      return req.proxyUrl;
    },
  })
);

httpServer.listen(7000, () => {
  console.log(`Servidor HTTPS rodando na porta `);
});
