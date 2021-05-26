import { boot } from 'quasar/wrappers'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  from,
} from '@apollo/client/core'
import { getToken } from 'src/services/auth/authService'
import { ENVIRONMENT } from 'src/environment'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'

let apolloClients: Record<string, ApolloClient<unknown>>

export default boot(() => {
  const httpLink = new HttpLink({
    uri: ENVIRONMENT.resources.gatewayApi.uri,
  })

  const authMiddleware = setContext(async (req, { headers }) => {
    const token = await getToken(ENVIRONMENT.resources.gatewayApi.scopes)

    const completeHeader = {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      } as Express.Request & { authorization: string },
    }

    if (ENVIRONMENT.mode !== 'production') {
      // console.log('accessToken: ', completeHeader.headers.authorization)
    }
    return completeHeader
  })

  const logLink = onError((error) => console.error('Apollo Error', error))

  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([authMiddleware, logLink, httpLink]),
  })

  apolloClients = {
    default: apolloClient,
  }
})

export { apolloClients }
