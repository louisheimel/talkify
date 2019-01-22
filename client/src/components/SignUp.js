import React, { Fragment } from "react";
import { Input, Button } from "antd";

export default function SignUp(props) {
  return (
    <Fragment>
      <Input size="large" placeholder="Username" />
      <Input size="large" placeholder="Password" />
      <Input size="large" placeholder="Confirm Password" />
      <Button size="large">Submit</Button>,
    </Fragment>
  );
}
