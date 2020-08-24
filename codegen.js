/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')

const token = fs.readFileSync('./token.txt')

module.exports = {
  overwrite: true,
  schema: {
    'http://localhost:5000/graphql': {
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
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
}
