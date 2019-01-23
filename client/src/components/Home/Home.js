import React, { Component } from "react";

import { Layout, Input } from "antd";

import Toggler from "./Toggler";
import Threads from "./Threads";

const { TextArea } = Input;
const { Sider, Content } = Layout;

class Home extends Component {
  state = {
    inputValue: "",
    messages: []
  };
  toggle = () => {
    this.setState(prevState => ({
      ...prevState,
      collapsed: !prevState.collapsed
    }));
  };

  handleMessage = e => {
    this.setState(
      {
        messages: [...this.state.messages, e.target.value],
        inputValue: ""
      },
      () => console.log(this.state.messages, this.state.inputValue)
    );
  };

  handleInputChange = e => {
    this.setState(
      {
        ...this.state,
        inputValue: e.target.value
          .split("")
          .filter(e => e !== "\n")
          .join("")
      },
      () =>
        console.log(
          this.state.inputValue,
          " from inside handleInputChange method"
        )
    );
  };
  render() {
    const { collapsed } = this.state;

    const siderStyles = { color: "#fff", fontSize: "24px", userSelect: "none" };
    const layoutStyles = {
      position: "relative"
    };

    const contentStyles = {
      display: "flex",
      justifyContent: "center",
      position: "relative",
      width: "100%",
      boxSizing: "border-box"
    };

    const inputStyles = {
      margin: "0 30px",
      width: "100%",
      resize: "none",
      alignSelf: "flex-end"
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
        <Content style={contentStyles}>
          <TextArea
            style={inputStyles}
            autosize
            onPressEnter={this.handleMessage}
            onChange={this.handleInputChange}
            value={this.state.inputValue}
          />
        </Content>
      </Layout>
    );
  }
}

export default Home;
