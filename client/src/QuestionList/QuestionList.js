/**
 * Created by will on 29/09/18.
 */
import React from 'react';

const QuestionList = ({ questions }) => {
  console.log(questions)
  return (
    <div>
      <h1>Questions</h1>
      {questions.map(question => {
        return <h3 key={question.id}>{question.question}</h3>
      })}
    </div>
  )
};

export default QuestionList;