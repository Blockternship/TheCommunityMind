/**
 * Created by will on 29/09/18.
 */
import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag'

import QuestionList from './QuestionList';

const GET_QUESTIONS = gql`    query questions {
    questions {
        id
        question
    }
 }
`;

const QuestionListContainer = () =>
  <Query query={GET_QUESTIONS}
    pollInterval={0}
  >
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        return (
            <QuestionList questions={data.questions}/>
        );
      }}
    </Query>;

export default QuestionListContainer;