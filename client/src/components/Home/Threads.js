import React, { Component } from "react";
import { connect } from "react-redux";

import ThreadList from "./ThreadList";

class Threads extends Component {
  render() {
    const {
      currentWorkspace,
      workspaceOptions,
      currentChannel,
      channelOptions,
      channelLabel,
      dmLabel,
      showList
    } = this.props;

    return [
      <ThreadList threadName={currentWorkspace} showList={showList} />,
      <ThreadList threadName={channelLabel} showList={showList} />,
      <ThreadList threadName={dmLabel} showList={showList} />
    ];
    // return Object.keys(threads).map(threadName => {
    //   switch (threadName) {
    //     case "Workspace":
    //       return (
    //         <ThreadList
    //           threadName={threadName}
    //           threads={threads[threadName]}
    //           showList={showList}
    //         />
    //       );
    //     default:
    //       return (
    //         <ThreadList
    //           threadName={threadName}
    //           threads={threads[threadName]}
    //           showList={showList}
    //         />
    //       );
    //   }
    // });
  }
}

export default connect(
  state => ({
    currentWorkspace: state.threads.workspace.current,
    workspaceOptions: state.threads.workspace.options,
    channelLabel: state.threads.channels.label,
    dmLabel: state.threads.directMessages.label
  }),
  dispatch => ({})
)(Threads);
