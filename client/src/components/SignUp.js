import React, { Component, Fragment } from "react";
import { Input, Button } from "antd";
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
      handleUsernameChange,
      handlePasswordChange,
      handleConfirmPasswordChange
    } = this.props;
    const data = { username, password, confirmPassword };
    return (
      <Fragment>
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
        />
        <Button
          size="large"
          onClick={() => requestSignup({ username, password, confirmPassword })}
        >
          Submit
        </Button>
        ,
      </Fragment>
    );
  }
}

export default connect(
  state => (
    console.log(state),
    {
      username: state.signup.signupCredentials.username,
      password: state.signup.signupCredentials.password,
      confirmPassword: state.signup.signupCredentials.confirmPassword
    }
  ),
  dispatch => ({
    handleUsernameChange: username => dispatch(updateSignupUsername(username)),
    handlePasswordChange: password => dispatch(updateSignupPassword(password)),
    handleConfirmPasswordChange: confirmPassword =>
      dispatch(updateSignupConfirmPassword(confirmPassword)),
    requestSignup: signupData =>
      dispatch(requestSignup(console.log(signupData), signupData))
  })
)(SignUp);
