import React, { Component, Fragment } from "react";
import { Dropdown, Menu } from "antd";
import { connect } from "react-redux";
import { ThreadListItem, SelectedThreadListItem } from "./ThreadListItem";
import { changeWorkspace } from "../../redux/actionCreators";

import getCurrentChannel from "../../redux/reducers/selectors/currentChannelSelector";

const workspaceMenu = (workspaces, selectMenuItem) => (
  <Menu>
    {workspaces.map(workspace => (
      <Menu.Item onClick={selectMenuItem(workspace)} key={workspace}>
        {workspace}
      </Menu.Item>
    ))}
  </Menu>
);

class ThreadList extends Component {
  selectMenuItem = workspace => () => {
    const { handleWorkspaceChange } = this.props;
    handleWorkspaceChange(workspace);
  };

  render() {
    const {
      options,
      label,
      isWorkspaceList,
      currentChannel,
      workspaces,
      threadName,
      showList
    } = this.props;
    console.log("options are: ", options);
    console.log("current channel is: ", currentChannel);

    const ulStyles = {
      paddingLeft: "20px"
    };

    const pStyles = {
      marginBottom: "5px"
    };
    console.log(options, " are options");
    const threadListItems = options
      ? options.map(option =>
          (option === currentChannel ? SelectedThreadListItem : ThreadListItem)(
            option
          )
        )
      : null;

    console.log(this.props);
    return isWorkspaceList ? (
      [
        <Dropdown
          overlay={workspaceMenu(options, this.selectMenuItem)}
          trigger={["hover"]}
        >
          <p>{threadName}</p>
        </Dropdown>
      ]
    ) : (
      <Fragment>
        {/* TODO: render channel and dm thread here */}
        <p
          style={
            showList
              ? pStyles
              : {
                  ...pStyles,
                  fontSize: "12px",
                  marginTop: "30px",
                  fontWeight: "700"
                }
          }
        >
          {threadName}
        </p>
        {showList && (
          <ul key="ul" style={ulStyles}>
            {threadListItems}
          </ul>
        )}
      </Fragment>
    );
  }
}

export default connect(
  state => (
    console.log(state, " is state in thread list component"),
    console.log("getCurrentChannel(state): ", getCurrentChannel(state)),
    {
      workspaces: state.threads.workspace.options,
      currentChannel: state.threads.workspace.options.find(
        option => option.name === state.threads.workspace.current
      ).currentChannel
    }
  ),
  dispatch => ({
    handleWorkspaceChange: workspace => dispatch(changeWorkspace(workspace))
  })
)(ThreadList);
