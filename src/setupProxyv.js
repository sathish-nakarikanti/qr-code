const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // This should match the base URL part of your API requests
    createProxyMiddleware({
      target: 'https://login.salesforce.com', // The target for your API calls
      changeOrigin: true,
      secure: true, // If you are using HTTPS on the target server
      pathRewrite: {
        '^/api': '', // Removes '/api' from the path when forwarding
      },
    })
  );
};
