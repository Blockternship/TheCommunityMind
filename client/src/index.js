import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppContainer from "./AppContainer";
import registerServiceWorker from "./registerServiceWorker";

// import drizzle functions and contract artifact
import { Drizzle, generateStore } from "drizzle";
import { DrizzleContext } from "drizzle-react";
import { ApolloProvider } from "react-apollo";
import TheMind from "./contracts/TheMind.json";
import client from "./apollo-client";

// let drizzle know what contracts we want
const options = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [TheMind],
  events: {
    TheMind: ["QuestionAsked"]
  },
  polls: {
    accounts: 1500
  }
};

// setup the drizzle store and drizzle
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

// pass in the drizzle instance
ReactDOM.render(
  <DrizzleContext.Provider drizzle={drizzle} >
    <ApolloProvider client={client}>
      <AppContainer />
    </ApolloProvider>
  </DrizzleContext.Provider>
  , document.getElementById("root"));
registerServiceWorker();
