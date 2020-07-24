import { boot } from 'quasar/wrappers'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { from } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { provide } from '@vue/composition-api'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import { getToken } from 'src/services/auth/authService'
import config from 'src/app-config.json'

export default boot(({ app }) => {
  const httpLink = createHttpLink({ uri: config.resources.gatewayApi.uri })

  // eslint-disable-next-line
  const authMiddleware = setContext(async (req, { headers }) => {
    const token = await getToken(config.resources.gatewayApi.scopes)

    // console.log('token.accessToken: ', token.accessToken)
    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      headers: {
        ...headers,
        authorization:
          token && token.accessToken ? `Bearer ${token.accessToken}` : '',
      },
    }
  })

  const logLink = onError((error) => console.error('Apollo Error', error))

  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([authMiddleware, logLink, httpLink]),
  })

  app.setup = () => {
    provide(DefaultApolloClient, apolloClient)
    return {}
  }
})
