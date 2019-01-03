const PROXY_CONFIG = [
  {
    context: [
      '/api',
      '/content',
    ],
    target: 'http://localhost:3000',
    secure: false,
  },
];

module.exports = PROXY_CONFIG;
