import React, { Component, Fragment } from "react";
import ThreadListItem from "./ThreadListItem";

class ThreadList extends Component {
  render() {
    const { threads, threadName, showList } = this.props;

    const ulStyles = {
      paddingLeft: "20px"
    };

    const pStyles = {
      marginBottom: "5px"
    };

    const threadListItems = threads && threads.map(ThreadListItem);

    return (
      <Fragment>
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
