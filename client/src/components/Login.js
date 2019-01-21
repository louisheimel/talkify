import React, {Component, Fragment} from 'react';
import {Input, Button} from 'antd';
import {Link} from "react-router-dom";
import axios from 'axios';

class Login extends Component {
  state = {}
  submitLoginData = e => {
    const {data} = this.state;
    console.log(data);
    axios.post('/api/login', data || {})
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }

  handleInputChange = e => {
    const {name, value} = e.target;
    this.setState({data: {...this.state.data, [name]: value}});
  }

  render() {
    return <Fragment>
      <Input size="large" placeholder="Username" onChange={this.handleInputChange} name="username" />
      <Input size="large" placeholder="Password" onChange={this.handleInputChange} name="password" />
      <Button size="large" onClick={this.submitLoginData}>Submit</Button>
      <Link className="link" to="/signup">Don't have an account?  Sign up here!</Link>
    </Fragment>;
  }
}

export default Login;