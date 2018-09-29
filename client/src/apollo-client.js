/**
 * Created by will on 29/09/18.
 */
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://127.0.0.1:8000/"
});

export default new ApolloClient(client);

