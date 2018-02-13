import React from "react";
import {Router, Route, browserHistory, IndexRoute} from "react-router";

import Main from "../components/Main/Main";
import Home from '../components/Home/Home';
import Why from "../components/Questions/Why";
import WhatIf from "../components/Questions/WhatIf";
import How from "../components/Questions/How";
import LoginContainer from "../components/Authentication/LoginContainer";
import RegisterContainer from "../components/Authentication/RegisterContainer";
import UserProfileContainer from "../components/UserProfile/UserProfileContainer";

var AppRouter = function () {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={Main}>
        <Route component={Home}>
          <IndexRoute component={Why}/>
          {/*<Route path="/thread/:name" component={ThreadPage}/>*/}
          <Route path="popular" component={Why}/>
        </Route>
        <Route path='/whatif' component={WhatIf}/>
        <Route path='/how' component={How}/>
        < Route
          path='/login'
          component={LoginContainer}/>
        < Route
          path='/register'
          component={RegisterContainer}/>
        <Route
          path='/profile'
          component={UserProfileContainer}/>
      </Route>



    </ Router >
  )
}


module.exports = AppRouter;
