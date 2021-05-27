/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs')

const token = fs.readFileSync('./token.txt')

module.exports = {
  overwrite: true,
  schema: {
    [process.env.BACKEND_API_URI]: {
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
      config: {
        withCompositionFunctions: true,
        vueCompositionApiImportFrom: 'vue',
      },
    },
    'src/graphql/generated/fragment-matcher.ts': ['fragment-matcher'],
  },
}
