/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const config = require('./src/app-config.json')

const token = fs.readFileSync('./token.txt')

module.exports = {
  overwrite: true,
  schema: {
    [config.resources.gatewayApi.uri]: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  },
  documents: 'src/**/*.graphql',
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
  generates: {
    'src/graphql/generated/schema.json': {
      plugins: ['introspection'],
    },
    'src/graphql/generated/operations.ts': {
      plugins: [
        {
          add: {
            content: '/* eslint-disable */',
          },
        },
        'typescript',
        'typescript-operations',
        'typescript-vue-apollo',
      ],
    },
    'src/graphql/generated/fragment-matcher.ts': ['fragment-matcher'],
  },
}
