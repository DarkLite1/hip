module.exports = {
  client: {
    service: {
      name: 'graphql-backend',
      localSchemaFile: 'src/graphql/generated/schema.json',
    },
    // Files processed by the extension
    includes: ['src/**/*.vue', 'src/**/*.ts'],
  },
}
