import React, { Component } from "react";

import { Layout, Input } from "antd";

import Toggler from "./Toggler";
import Threads from "./Threads";

const { TextArea } = Input;
const { Sider, Content } = Layout;

class Messages extends Component {
  render() {
    const { messages, style } = this.props;
    return (
      <div style={style}>
        {messages.map(message => (
          <p style={{ width: "100%" }}>{message}</p>
        ))}
      </div>
    );
  }
}
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
    const { value: val } = e.target;
    this.setState(
      {
        ...this.state,
        inputValue: val.slice(-1) === "\n" ? val.slice(0, -1) : val
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
      flexWrap: "wrap",
      justifyContent: "center",
      position: "relative",
      width: "100%",
      boxSizing: "border-box",
      overflow: "hidden"
    };

    const messagesStyles = {
      fontWeight: "bold",
      justifyContent: "flex-start",
      position: "absolute",
      left: "0",
      top: "0",
      bottom: "47px",
      margin: "0 30px",
      padding: "25px 5px",
      overflow: "auto"
    };

    const inputStyles = {
      margin: "0 30px",
      width: "100%",
      height: "32px",
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
          <Messages style={messagesStyles} messages={this.state.messages} />
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
