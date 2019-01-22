import React, {Component, Fragment} from 'react';
import {Input, Button} from 'antd';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import { 
  updateLoginPassword,
  updateLoginUsername,
  requestLogin 
} from '../redux/actionCreators';

class Login extends Component {
  state = {}

  render() {
    const {
      handleUsernameChange, 
      handlePasswordChange, 
      username, 
      password,
      requestLogin
    } = this.props;

    return <Fragment>
      <Input size="large" placeholder="Username" onChange={handleUsernameChange} name="username" value={username}/>
      <Input size="large" placeholder="Password" onChange={handlePasswordChange} name="password" password={password}/>
      <Button size="large" onClick={() => requestLogin(this.state.data)}>Submit</Button>
      <Link className="link" to="/signup">Don't have an account?  Sign up here!</Link>
    </Fragment>;
  }
}

export default connect(
  state => ({
    username: state.login.loginCredentials.username,
    password: state.login.loginCredentials.password
  }),
  dispatch => ({
    handleUsernameChange: e => dispatch(updateLoginUsername(e.target.value)),
    handlePasswordChange: e => dispatch(updateLoginPassword(e.target.value)),
    requestLogin: (loginData) => dispatch(requestLogin(loginData))
  }) 
)(Login);