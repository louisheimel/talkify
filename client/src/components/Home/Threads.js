import React, { Component } from "react";
import { connect } from "react-redux";

import getCurrentWorkspace from "../../redux/reducers/selectors/currentWorkspaceSelector";
import getCurrentMessages from "../../redux/reducers/selectors/currentMessagesSelector";
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
    console.log(workspaceOptions, " are workspace options");
    return [
      <ThreadList
        threadName={currentWorkspace}
        showList={showList}
        options={workspaceOptions}
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
  }
}

export default connect(
  state => (
    console.log(getCurrentMessages(state)),
    {
      currentWorkspace: getCurrentWorkspace(state),
      workspaceOptions: state.threads.workspace.options.map(
        workspace => workspace.name
      ),
      channelLabel:
        getCurrentMessages(state).channels &&
        getCurrentMessages(state).channels.label,
      channelOptions:
        getCurrentMessages(state).channels &&
        getCurrentMessages(state).channels.options,
      dmOptions:
        getCurrentMessages(state).directMessages &&
        getCurrentMessages(state).directMessages.options,
      dmLabel:
        getCurrentMessages(state).directMessages &&
        getCurrentMessages(state).directMessages.label
    }
  ),
  dispatch => ({})
)(Threads);
