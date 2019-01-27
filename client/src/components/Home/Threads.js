import React, { Component } from "react";
import ThreadList from "./ThreadList";

class Threads extends Component {
  render() {
    const { threads, showList } = this.props;

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

export default Threads;
