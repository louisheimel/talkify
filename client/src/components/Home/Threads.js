import React, { Component } from "react";
import { connect } from "react-redux";

import ThreadList from "./ThreadList";

class Threads extends Component {
  render() {
    const { threads, showList, threadName } = this.props;

    return Object.keys(threads).map(threadName => {
      switch (threadName) {
        case "Workspace":
          return (
            <ThreadList
              threadName={threadName}
              threads={threads[threadName]}
              showList={showList}
            />
          );
        default:
          return (
            <ThreadList
              threadName={threadName}
              threads={threads[threadName]}
              showList={showList}
            />
          );
      }
    });
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(Threads);
