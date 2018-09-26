/**
 * Created by will on 18/09/18.
 */
import React from 'react';

class QuestionList extends React.Component {

  componentDidMount() {
    this.props.drizzle.contracts.TheMind.events
      .QuestionAsked({/* eventOptions */}, (error, event) => {
        console.log(error, event);
      })
      .on('data', (event) => console.log(event))
      .on('changed', (event) => console.log(event))
      .on('error', (error) => console.log(error));
  }

  render() {
    return (
      <div>
        <h1>
          Questions
        </h1>
      </div>
    )
  }
}

export default QuestionList;