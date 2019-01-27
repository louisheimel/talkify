import React, { Component, Fragment } from "react";
import { Dropdown, Menu } from "antd";
import { connect } from "react-redux";
import ThreadListItem from "./ThreadListItem";
const workspaceMenu = workspaces => (
  <Menu>
    {workspaces.map(workspace => (
      <Menu.Item key={workspace}>{workspace}</Menu.Item>
    ))}
  </Menu>
);
class ThreadList extends Component {
  render() {
    const { threads, threadName, showList, workspaces } = this.props;
    console.log(threads, threadName, showList);

    const ulStyles = {
      paddingLeft: "20px"
    };

    const pStyles = {
      marginBottom: "5px"
    };

    const threadListItems = threads && threads.map(ThreadListItem);
    return threadName === "Work" ? (
      <Dropdown overlay={workspaceMenu(workspaces)} trigger={["hover"]}>
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
  dispatch => ({})
)(ThreadList);
