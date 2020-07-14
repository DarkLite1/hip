import { boot } from 'quasar/wrappers'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { provide } from '@vue/composition-api'
import config from 'src/app-config.json'

export default boot(({ app }) => {
  const httpLink = createHttpLink({
    uri: config.resources.gatewayApi.uri,
  })

  const cache = new InMemoryCache()

  const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
  })

  app.setup = () => {
    provide(DefaultApolloClient, apolloClient)
  }
})
