/**
 * Created by will on 16/11/17.
 */
import React from 'react'
import PropTypes from 'prop-types'

import UserQuestions from './UserQuestions';

import { LATEST } from './viewLabels';

class UserQuestionsContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      questionView: LATEST,
    }

    this.changeView = this.changeView.bind(this);
  }

  changeView(viewType) {
    this.setState({ questionView: viewType })
  }

  render() {
    return (
      <UserQuestions
        whys={this.props.whys}
        whatIfs={this.props.whatIfs}
        hows={this.props.hows}
        latestQuestions={this.props.latestQuestions}
        staredQuestions={this.props.staredQuestions}
        questionView={this.state.questionView}
        onViewChange={this.changeView}
      />
    )

  }
}

UserQuestionsContainer.propTypes = {
  whys: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      question: PropTypes.shape({
        id: PropTypes.string.isRequired,
        question: PropTypes.string.isRequired
      }).isRequired,
    }).isRequired,
  ),
  whatIfs: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      question: PropTypes.shape({
        id: PropTypes.string.isRequired,
        question: PropTypes.string.isRequired
      }).isRequired,
    }).isRequired,
  ),
  hows: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      question: PropTypes.shape({
        id: PropTypes.string.isRequired,
        question: PropTypes.string.isRequired
      }).isRequired,
    }).isRequired,
  ),
  latestQuestions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      question: PropTypes.shape({
        id: PropTypes.string.isRequired,
        question: PropTypes.string.isRequired
      }).isRequired,
    }).isRequired,
  )
}

export default UserQuestionsContainer;