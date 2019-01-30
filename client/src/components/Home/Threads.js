import React, { Component } from "react";
import { connect } from "react-redux";

import ThreadList from "./ThreadList";

class Threads extends Component {
  render() {
    const {
      currentWorkspace,
      workspaceOptions,
      currentChannel,
      dmOptions,
      channelOptions,
      channelLabel,
      dmLabel,
      showList
    } = this.props;
    console.log(showList, " is showList");
    return [
      <ThreadList
        threadName={currentWorkspace}
        showList={showList}
        isWorkspaceList
      />,
      <ThreadList
        threadName={channelLabel}
        showList={showList}
        options={channelOptions}
      />,
      <ThreadList
        threadName={dmLabel}
        showList={showList}
        options={dmOptions}
      />
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
    channelOptions: state.threads.channels.options,
    dmOptions: state.threads.directMessages.options,
    dmLabel: state.threads.directMessages.label
  }),
  dispatch => ({})
)(Threads);
