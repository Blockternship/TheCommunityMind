import React from 'react'
import MainHeader from './Header/MainHeader'
import FullDiv from '../generic/FullDiv';
import { Grid } from 'react-bootstrap'
import { connect } from 'react-redux'
import { signOut } from '../../actions/Auth';
import { showAskQuestionPopup, hideAskQuestionPopup } from '../../actions/AskQuestionPopup';
import { withApollo } from 'react-apollo';
import { browserHistory } from 'react-router'

import Notifications from 'react-notification-system-redux';

import AskQuestionPopupContainer from '../AskQuestionPopup/AskQuestionPopupContainer';



const mapStateToProps = function (state) {
  return {
    currentUser: state.auth.currentUser,
    notifications: state.notifications,
    currentWhy: state.currentWhy,
    currentWhatIf: state.currentWhatIf
  }
};

const mapDispatchToProps = function (dispatch) {
  return {
    logout: () => {
      dispatch(signOut());
    },
    showAskQuestionPopup: (currentWhy, currentWhatIf) => {
      dispatch(showAskQuestionPopup(currentWhy, currentWhatIf));
    },
    hideAskQuestionPopup: () => {
      dispatch(hideAskQuestionPopup())
    }
  }
};

let Main = React.createClass({
  // style: {
  //   padding: "70px 20px"
  // },


  //Optional styling
  notificationStyle: {
    NotificationItem: { // Override the notification item
      DefaultStyle: { // Applied to every notification, regardless of the notification level
        margin: '10px 5px 2px 1px'
      },

      success: { // Applied only to the success notification item
        color: 'green'
      },
      error: {
        color: 'red'
      }
    }
  },

  logout() {
    // should i clear it all?
    console.log("Loggin out")
    localStorage.clear();
    this.props.logout()
    this.props.client.resetStore()

  },

  showAskQuestionPopup() {
    this.props.showAskQuestionPopup(this.props.currentWhy, this.props.currentWhatIf)
  },

  viewProfile() {
    browserHistory.push({pathname: "/profile", query: {userId: this.props.currentUser.id}})
  },


  viewWatchList() {

    console.log("Viewing watch list")
  },

  render() {
    this.props.hideAskQuestionPopup();

    return (
      <FullDiv>
        <MainHeader
          currentUser={this.props.currentUser}
          logout={this.logout}
          viewProfile={this.viewProfile}
          viewWatchList={this.viewWatchList}
          onQuestionClick={this.showAskQuestionPopup}
        ></MainHeader>


        <Grid style={this.style}>
          <AskQuestionPopupContainer/>
          {this.props.children}
        </Grid>
        <Notifications
          notifications={this.props.notifications}
          style={this.notificationStyle}
        />

      </FullDiv>
    )
  }
})

export default withApollo(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Main)
)


