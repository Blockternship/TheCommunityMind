/**
 * Created by will on 18/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from "react-apollo";
import { browserHistory } from 'react-router'

import styles from './styles.css';

import UserInteractionsBar from '../UserInteractionsBar/UserInteractionsBar';
import QuestionUsernameBar from '../QuestionUsernameBar/QuestionUsernameBar';
import QuestionBox from '../QuestionBox/QuestionBox'

import FIND_OR_CREATE_TOPIC from '../../graphql/mutations/findOrCreateTopic.mutation';
import CREATE_QUESTION_MUTATION from '../../graphql/mutations/createQuestion.mutation';

const createQuestion = graphql(CREATE_QUESTION_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    createQuestion: ( questionText, topicIds, linkType, questioningId) => {
      return mutate({

        variables: { questionText, topicIds, linkType, questioningId },

      }).catch(res => {

        res.graphQLErrors.map((error) => {
          console.log(error.message)
          //TODO add notifications
          if (error.message === "Unauthorized")
          {
            // ownProps.unAuthorized();
          }
          return error;
        });
      })
    }

  })
});

const findOrCreateTopic = graphql(FIND_OR_CREATE_TOPIC, {
  props: ({ ownProps, mutate }) => ({
    findOrCreateTopic: (name) => {
      return mutate({
        variables: { name: name },
        optimisticResponse: {
          __typename: 'Mutation',
          findOrCreateTopic: {
            __typename: 'Topic',
            id: "-1", // fake id
            name: name

          },

        },

      }).catch(res => {
        // catches any error returned from mutation request
        res.graphQLErrors.map((error) => {
          // What about other errors?
          throw new Error('Unable to add Topic')
        });
      })
    }
  })
});

class QuestionInputFocus extends React.Component {

  isInput = true;
  // TODO not happy with how this is achieved. Should load links from BE
  linkTypes = [{id: '1', linkType: "Super Question"}, {id: '2', linkType: "Sub Question"}, {id: '3', linkType: "Related Question"}];

  constructor(props) {
    super(props);
    // TODO possible make state mirror a question object from graphql response
    this.state = {
      question: {
        linksToTopics: {edges: []},
        linkTypeSelected: null,
        questionText: "",
      }
    };

    this.handleSubmitQuestion = this.handleSubmitQuestion.bind(this);
    this.handleQuestionTextChange = this.handleQuestionTextChange.bind(this);
    this.handleUpdateQuestionLinkTypeSelected = this.handleUpdateQuestionLinkTypeSelected.bind(this);
    this.handleAddTopic = this.handleAddTopic.bind(this);
  }



  handleQuestionTextChange(updatedQuestionText) {
    this.setState({
      question: {
        ...this.state.question,
        questionText: updatedQuestionText
      }

    })
  }

  handleUpdateQuestionLinkTypeSelected(linkTypeId) {
    if (this.state.question.linkTypeSelected && this.state.question.linkTypeSelected.id === linkTypeId) {
      this.setState({
        question: {
          ...this.state.question,
          linkTypeSelected: null
        }
      })
    }
    else {
      let linkIds = this.linkTypes.map(type => type.id);
      this.setState({
        question: {
          ...this.state.question,
          linkTypeSelected: this.linkTypes[linkIds.indexOf(linkTypeId)]
        }
      })
    }
  }

  handleAddTopic(topic) {
    this.props.findOrCreateTopic(topic)
      .then(response => {
        if (response.data.findOrCreateTopic) {
          this.setState({
            question: {
              ...this.state.question,
              linksToTopics: {
                edges: [...this.state.question.linksToTopics.edges, {node: {topic: response.data.findOrCreateTopic}}]
              }
            }
          })
        }
      })
      .catch(error => {
        // TODO handle error with notifications
        console.log(error)
      })

  }

  handleSubmitQuestion() {
    console.log(this.state.question);
    const questionText = this.state.question.questionText;
    const linkType = this.state.question.linkTypeSelected ? this.state.question.linkTypeSelected.linkType : null;
    const topicIds = this.state.question.linksToTopics.edges.map(edge => edge.node.topic.id);

    this.props.createQuestion(questionText, topicIds, linkType, this.props.questioningId).then(response => {
      this.setState({
        question: {
          linksToTopics: {edges: []} ,
          linkTypeSelected: null,
          questionText: "",
        }
      });
      browserHistory.push({pathname: "/question", query: {questionId: response.data.createQuestion.id}})
    })
      .catch(error => {
        // TODO handle error with notification
        console.log("Error", error);
      })
  }

  render() {
    return (
      <div className={styles.focusGrid}>
        <QuestionUsernameBar focusType="Question Input" isInput={this.isInput}/>
        <QuestionBox
          isInput={this.isInput}
          onSubmitQuestion={this.handleSubmitQuestion}
          onQuestionChange={this.handleQuestionTextChange}
          question={this.state.question}
          onSelectQuestionLink={this.handleUpdateQuestionLinkTypeSelected}
          linkTypes={this.linkTypes}
          onAddTopic={this.handleAddTopic}
        />
        <UserInteractionsBar
          isInput={this.isInput}
          onSubmitQuestion={this.handleSubmitQuestion}
          toggleIsInput={this.props.toggleIsInput}/>
      </div>

    )
  }
}

QuestionInputFocus.propTypes = {
  toggleIsInput: PropTypes.func.isRequired,
  findOrCreateTopic: PropTypes.func.isRequired,
  createQuestion: PropTypes.func.isRequired,
  questioningId: PropTypes.string.isRequired,
};

export default compose(
  findOrCreateTopic,
  createQuestion
)(QuestionInputFocus);