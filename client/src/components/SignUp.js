import React, { Component, Fragment } from "react";
import { Input, Button } from "antd";
import { connect } from "react-redux";

class SignUp extends Component {
  render() {
    return (
      <Fragment>
        <Input size="large" placeholder="Username" />
        <Input size="large" placeholder="Password" />
        <Input size="large" placeholder="Confirm Password" />
        <Button size="large">Submit</Button>,
      </Fragment>
    );
  }
}

export default connect()(SignUp);
