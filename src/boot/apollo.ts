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
import { ENVIRONMENT } from 'src/environment'

export default boot(({ app }) => {
  const httpLink = createHttpLink({ uri: ENVIRONMENT.resources.gatewayApi.uri })

  const authMiddleware = setContext(async (req, { headers }) => {
    const token = await getToken(ENVIRONMENT.resources.gatewayApi.scopes)

    const completeHeader = {
      headers: {
        ...headers,
        authorization:
          token && token.accessToken ? `Bearer ${token.accessToken}` : '',
      } as Express.Request & { authorization: string },
    }

    console.log('accessToken: ', completeHeader.headers.authorization)
    return completeHeader
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
