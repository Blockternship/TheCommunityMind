/**
 * Created by will on 18/09/18.
 */
import React from 'react';
import { DrizzleContext } from "drizzle-react";

import App from './App';

export default () => (
  <DrizzleContext.Consumer >
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;

      if (!initialized) {
        return "Loading ..."
      }

      return (
        <App drizzle={drizzle} drizzleState={drizzleState}/>
      )
    }
  }
  </DrizzleContext.Consumer>
)
