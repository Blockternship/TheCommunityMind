import React, { Component } from 'react';
import AskQuestion from './AskQuestion';
import QuestionListContainer from './QuestionList/QuestionListContainer';
import './App.css';

class App extends Component {
  render() {
    return <div className="App">
      <AskQuestion
        drizzle={this.props.drizzle}
        drizzleState={this.props.drizzleState}
      />
      <QuestionListContainer/>
    </div>;
  }
}

export default App;
