import React, { Component, Fragment } from "react";
import { Input, Button } from "antd";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateLoginPassword,
  updateLoginUsername,
  requestLogin
} from "../redux/actionCreators";

class Login extends Component {
  state = {};

  render() {
    const {
      handleUsernameChange,
      handlePasswordChange,
      username,
      password,
      requestLogin,
      loggedIn
    } = this.props;
    console.log(loggedIn);
    return loggedIn ? (
      <Redirect to="/home" />
    ) : (
      <Fragment>
        <Input
          size="large"
          placeholder="Username"
          onChange={handleUsernameChange}
          name="username"
          value={username}
        />
        <Input
          size="large"
          placeholder="Password"
          onChange={handlePasswordChange}
          name="password"
          value={password}
        />
        <Button
          size="large"
          onClick={() => requestLogin({ username, password })}
        >
          Submit
        </Button>
        <Link className="link" to="/signup">
          Don't have an account? Sign up here!
        </Link>
      </Fragment>
    );
  }
}

export default connect(
  state => (
    console.log(state.loginStatus, " is loginStatus"),
    {
      username: state.login.loginCredentials.username,
      password: state.login.loginCredentials.password,
      loggedIn: state.loginStatus.loggedIn
    }
  ),
  dispatch => ({
    handleUsernameChange: e => dispatch(updateLoginUsername(e.target.value)),
    handlePasswordChange: e => dispatch(updateLoginPassword(e.target.value)),
    requestLogin: loginData => dispatch(requestLogin(loginData))
  })
)(Login);
