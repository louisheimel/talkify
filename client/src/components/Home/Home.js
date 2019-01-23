import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { Layout, Icon } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Toggler from "./Toggler";
import Threads from "./Threads";
const { Sider, Content, Footer, Button } = Layout;

class Home extends Component {
  state = {};
  toggle = () => {
    this.setState(prevState => ({
      ...prevState,
      collapsed: !prevState.collapsed
    }));
  };
  render() {
    const { collapsed } = this.state;

    const siderStyles = { color: "#fff", fontSize: "24px", userSelect: "none" };
    const layoutStyles = {
      position: "relative"
    };

    const threads = {
      Workspace: [],
      Channels: ["project channel", "just for fun"],
      "Direct Messages": ["Alice", "Bob"]
    };

    return (
      <Layout style={layoutStyles}>
        <Sider collapsed={collapsed} style={siderStyles}>
          <Threads threads={threads} showList={!collapsed} />
          <Toggler toggle={this.toggle} collapsed={collapsed} />
        </Sider>
        <Content>Main Content</Content>
      </Layout>
    );
  }
}

export default Home;
