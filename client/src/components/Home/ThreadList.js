import React, { Component, Fragment } from "react";
import { Dropdown, Menu } from "antd";
import ThreadListItem from "./ThreadListItem";
const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="http://www.alipay.com/">1st menu item</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="http://www.taobao.com/">2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
);
class ThreadList extends Component {
  render() {
    const { threads, threadName, showList } = this.props;
    console.log(threads, threadName, showList);

    const ulStyles = {
      paddingLeft: "20px"
    };

    const pStyles = {
      marginBottom: "5px"
    };

    const threadListItems = threads && threads.map(ThreadListItem);
    return threadName === "Work" ? (
      <Dropdown overlay={menu} trigger={["hover"]}>
        <p>Workspace</p>
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

export default ThreadList;
