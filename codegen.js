module.exports = {
  overwrite: true,
  schema: {
    'http://localhost:5000/graphql': {
      headers: {
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImppYk5ia0ZTU2JteFBZck45Q0ZxUms0SzRndyJ9.eyJhdWQiOiIwZTAxYTJkOC02NGJiLTRjM2ItYTc1ZC05MzlhYTVkOGQzNjEiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vNTc5NTI0MDYtYWYyOC00M2M4LWI0ZGUtYTRlMDZmNTc0NzZkL3YyLjAiLCJpYXQiOjE1OTgyNTEyNzQsIm5iZiI6MTU5ODI1MTI3NCwiZXhwIjoxNTk4MjU1MTc0LCJhaW8iOiJBVFFBeS84UUFBQUEvbjc1VmY5bzZBVFRXbUVNSTF6ZWJqMzVjd1FDZ2R0TnJzY25yRWhFeHY3TU1GUkQvSm9VZ3pWeDMyUTFiajM4IiwiYXpwIjoiZDk1ZjIzMjMtYjRhMS00NDNmLWE2YmUtYWNiNjEwNjg4YjQ5IiwiYXpwYWNyIjoiMCIsIm5hbWUiOiJHaWpiZWxzLCBCcmVjaHQgKEJyYWluZS1s4oCZQWxsZXVkKSBCRUwiLCJvaWQiOiI3Y2FkY2FkOC04YTVmLTQ5YzMtYWI5YS0wMTk4ZDQyZGQyNTMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJCcmVjaHQuR2lqYmVsc0BoZWlkZWxiZXJnY2VtZW50LmNvbSIsInNjcCI6ImFjY2Vzc19hc191c2VyIiwic3ViIjoiei1ELXVIdy05ZGZlQjFlRjhfUHFuSHBycTZkT3ZyNllRLWQxU3pmTHZhMCIsInRpZCI6IjU3OTUyNDA2LWFmMjgtNDNjOC1iNGRlLWE0ZTA2ZjU3NDc2ZCIsInV0aSI6IktQd1JCQ1g3ZzBTRk5rZXdwTkZXQUEiLCJ2ZXIiOiIyLjAifQ.KZv8cdmvD7mdRoA7ZNi09R46qBsG6F1EzQM5f4aHNBUqRwfZ6F2jnt8Ehvtdi88b5P7YlpIB4bYyBRUpnoKiR-a0NyC6NBqCVJeie1VZlnZzSwikU2oO2QVPeHwuGgNeNf5F1KAh-9dla8TPirjgiTrUuwIzQ1cfpB0Ni-JvtyJIQKL2oYVsZiVXFvHGIMPFkxJxDS_IL0pKV0eWv4LQXHzpgPgy_7lydAs42k1FCMkqLtaHqA1a9fck3BagbBjq24_5fcLFc1EHhstC-H0ym1MEHxepAmt4XlomJJNfhFMSCt9wezfpl0iAk_OyA3DjLMmiptBhhwsbxU_doY2_JA',
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
