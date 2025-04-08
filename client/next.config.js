module.exports = {
    async rewrites() {
      return [
        {
          source: '/series/:id',
          destination: '/pages/series/views/:id',
        },
      ];
    },
  };