import React from "react";
import { Icon } from "antd";

const iconStyles = {
  width: "100%",
  fontSize: "48px",
  position: "absolute",
  bottom: "0",
  marginBottom: "20px"
};

const Toggler = ({ toggle, collapsed }) =>
  collapsed ? (
    <Icon onClick={toggle} style={iconStyles} type="caret-right" />
  ) : (
    <Icon onClick={toggle} style={iconStyles} type="caret-left" />
  );

export default Toggler;
