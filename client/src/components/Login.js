import React, {Fragment} from 'react';
import {Input, Button} from 'antd';
import {Link} from "react-router-dom";

function Login(props) {
  return <Fragment>
    <Input size="large" placeholder="Username"/>
    <Input size="large" placeholder="Password"/>
    <Button size="large">Submit</Button>
    <Link className="link" to="/signup">Don't have an account?  Sign up here!</Link>
  </Fragment>
}

export default Login;