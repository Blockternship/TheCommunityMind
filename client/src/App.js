import React, { Component } from 'react';
import AskQuestion from './AskQuestion';
import QuestionList from './QuestionList';
import './App.css';

class App extends Component {
  render() {
    return <div className="App">
      <AskQuestion
        drizzle={this.props.drizzle}
        drizzleState={this.props.drizzleState}
      />
      <QuestionList
        drizzle={this.props.drizzle}
        drizzleState={this.props.drizzleState}
      />
    </div>;
  }
}

export default App;
