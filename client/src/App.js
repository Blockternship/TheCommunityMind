import React, { Component } from 'react';
import logo from './logo.svg';
import ReadString from './ReadString';
import SetString from './SetString';
import AskQuestion from './AskQuestion';
import QuestionList from './QuestionList';
import './App.css';

class App extends Component {
  render() {
    return <div className="App">
      <ReadString
        drizzle={this.props.drizzle}
        drizzleState={this.props.drizzleState}
      />
      <SetString
        drizzle={this.props.drizzle}
        drizzleState={this.props.drizzleState}
      />
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
