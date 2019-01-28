import React, { Component, Fragment } from "react";
import { Dropdown, Menu } from "antd";
import { connect } from "react-redux";
import ThreadListItem from "./ThreadListItem";
import { changeWorkspace } from "../../redux/actionCreators";

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
    const { isWorkspaceList } = this.props;

    const { threads, threadName, showList, workspaces } = this.props;

    const ulStyles = {
      paddingLeft: "20px"
    };

    const pStyles = {
      marginBottom: "5px"
    };

    const threadListItems = threads && threads.map(ThreadListItem);
    return isWorkspaceList ? (
      <Dropdown
        overlay={workspaceMenu(workspaces, this.selectMenuItem)}
        trigger={["hover"]}
      >
        <p>{threadName}</p>
      </Dropdown>
    ) : (
      // <Fragment>
      //   {/* TODO: Implement dropdown menu to change workspaces here */}

      //   <p
      //     style={
      //       showList
      //         ? pStyles
      //         : {
      //             ...pStyles,
      //             fontSize: "12px",
      //             marginTop: "30px",
      //             fontWeight: "700"
      //           }
      //     }
      //   >
      //     Work
      //   </p>
      // </Fragment>
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
  state => ({ workspaces: state.threads.workspace.options }),
  dispatch => ({
    handleWorkspaceChange: workspace => dispatch(changeWorkspace(workspace))
  })
)(ThreadList);
