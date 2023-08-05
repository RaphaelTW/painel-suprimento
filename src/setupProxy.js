const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/painel-suprimentos/api',
    createProxyMiddleware({
      target: 'http://localhost',
      changeOrigin: true,
    })
  );
};
