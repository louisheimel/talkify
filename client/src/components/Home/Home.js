import React, { Component } from "react";

import { Layout } from "antd";

import Toggler from "./Toggler";
import Threads from "./Threads";
const { Sider, Content } = Layout;

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
