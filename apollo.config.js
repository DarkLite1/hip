module.exports = {
    client: {
      service: {
        name: 'my-app',
        url: 'http://localhost:5000//graphql',
      },
      // Files processed by the extension
      includes: [
        'src/**/*.vue',
        'src/**/*.ts',
      ],
    },
  }