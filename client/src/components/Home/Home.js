import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Input } from "antd";
import { postMessage } from "../../redux/actionCreators";
import threadSelector from "../../redux/reducers/selectors/threadSelector";

import Toggler from "./Toggler";
import Threads from "./Threads";

const { TextArea } = Input;
const { Sider, Content } = Layout;

class Messages extends Component {
  render() {
    const { messages, style } = this.props;
    return (
      <div style={style}>
        {(messages || []).map(message => (
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
    this.setState({
      messages: [...this.state.messages, e.target.value],
      inputValue: ""
    });
  };

  handleInputChange = e => {
    const { value: val } = e.target;
    this.setState({
      ...this.state,
      inputValue: val.slice(-1) === "\n" ? val.slice(0, -1) : val
    });
  };
  render() {
    const { collapsed } = this.state;
    const {
      handleMessage,
      messages,
      namespace,
      room,
      threads,
      store
    } = this.props;
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
      right: "0",
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

    return (
      <Layout style={layoutStyles}>
        <Sider collapsed={collapsed} style={siderStyles}>
          <Threads threads={threads} showList={!collapsed} />
          <Toggler toggle={this.toggle} collapsed={collapsed} />
        </Sider>
        <Content style={contentStyles}>
          <code>{JSON.stringify(store)}</code>
          <Messages style={messagesStyles} messages={messages} />
          <TextArea
            style={inputStyles}
            autosize
            onPressEnter={() => {
              const inputValue = this.state.inputValue;
              this.setState({ inputValue: "" });
              handleMessage(inputValue, namespace, room);
            }}
            onChange={this.handleInputChange}
            value={this.state.inputValue}
          />
        </Content>
      </Layout>
    );
  }
}

export default connect(
  state => ({
    messages:
      state.threads.workspace.options &&
      state.threads.workspace.options.messages &&
      state.threads.workspace.options.messages.find(
        option => option.name === state.threads.workspace.current
      ).messages,
    namespace: state.threads.workspace.current,
    room:
      state.threads.workspace.options &&
      state.threads.workspace.options.find(
        option => option.name === state.threads.workspace.current
      ).currentChannel,
    store: state
  }),
  dispatch => ({
    handleMessage: (message, namespace, room) =>
      dispatch(postMessage(message, namespace, room))
  })
)(Home);
