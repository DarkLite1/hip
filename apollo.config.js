module.exports = {
    client: {
      service: {
        name: 'graphql-backend',
        url: 'http://localhost:5000//graphql',
      },
      // Files processed by the extension
      includes: [
        'src/**/*.vue',
        'src/**/*.ts',
      ],
    },
  }