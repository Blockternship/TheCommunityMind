/**
 * Created by will on 29/09/18.
 */
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const apolloClient = new ApolloClient({
  link: new HttpLink({
      uri: "http://127.0.0.1:8000/cli/graphql",
    }),
  cache: new InMemoryCache({
    addTypename: false,
    // dataIdFromObject: object => object.id || null
  })
})

// const client = new A

export default apolloClient;

