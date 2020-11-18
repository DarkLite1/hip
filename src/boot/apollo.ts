import { boot } from 'quasar/wrappers'
import { DefaultApolloClient } from '@vue/apollo-composable'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  from,
} from '@apollo/client/core'
import { provide } from '@vue/composition-api'
import { getToken } from 'src/services/auth/authService'
import { ENVIRONMENT } from 'src/environment'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'

export default boot(({ app }) => {
  const httpLink = new HttpLink({
    uri: ENVIRONMENT.resources.gatewayApi.uri,
  })

  const authMiddleware = setContext(async (req, { headers }) => {
    const token = await getToken(ENVIRONMENT.resources.gatewayApi.scopes)

    const completeHeader = {
      headers: {
        ...headers,
        authorization:
          token && token.accessToken ? `Bearer ${token.accessToken}` : '',
      } as Express.Request & { authorization: string },
    }

    if (ENVIRONMENT.mode !== 'production') {
      console.log('accessToken: ', completeHeader.headers.authorization)
    }
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
