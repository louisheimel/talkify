import React, { Component, Fragment } from "react";
import { Input, Button, Alert } from "antd";
import { connect } from "react-redux";
import { pipe, view, lensPath } from "ramda";

import {
  updateSignupUsername,
  updateSignupPassword,
  updateSignupConfirmPassword,
  requestSignup
} from "../redux/actionCreators";

const getValFromEvent = view(lensPath(["target", "value"]));

class SignUp extends Component {
  render() {
    const {
      username,
      password,
      confirmPassword,
      showAlertMessage,
      alertMessage,
      handleUsernameChange,
      handlePasswordChange,
      handleConfirmPasswordChange,
      handleSignupRequest
    } = this.props;
    return (
      console.log("alert message is: ", alertMessage),
      (
        <Fragment>
          {showAlertMessage && (
            <Alert
              type="error"
              message={alertMessage}
              style={{ fontWeight: "bold" }}
              className="alert"
              closable
            />
          )}
          <Input
            size="large"
            placeholder="Username"
            onChange={pipe(
              getValFromEvent,
              handleUsernameChange
            )}
            value={username}
          />
          <Input
            size="large"
            placeholder="Password"
            onChange={pipe(
              getValFromEvent,
              handlePasswordChange
            )}
            value={password}
          />
          <Input
            size="large"
            placeholder="Confirm Password"
            onChange={pipe(
              getValFromEvent,
              handleConfirmPasswordChange
            )}
            value={confirmPassword}
          />
          <Button
            size="large"
            onClick={() => (
              console.log("requesting signup"),
              handleSignupRequest({ username, password, confirmPassword })
            )}
          >
            Submit
          </Button>
          ,
        </Fragment>
      )
    );
  }
}

export default connect(
  state => ({
    username: state.signup.signupCredentials.username,
    password: state.signup.signupCredentials.password,
    confirmPassword: state.signup.signupCredentials.confirmPassword,
    showAlertMessage: state.signup.signupCredentials.showAlertMessage,
    alertMessage: state.signup.signupCredentials.alertMessage
  }),
  dispatch => ({
    handleUsernameChange: username => dispatch(updateSignupUsername(username)),
    handlePasswordChange: password => dispatch(updateSignupPassword(password)),
    handleConfirmPasswordChange: confirmPassword =>
      dispatch(updateSignupConfirmPassword(confirmPassword)),
    handleSignupRequest: signupData => dispatch(requestSignup(signupData))
  })
)(SignUp);
