import React, { Component, Fragment } from "react";

class ThreadList extends Component {
  render() {
    const { threads, threadName } = this.props;
    return (
      <Fragment>
        <p>{threadName}</p>
        <ul>
          {threads
            ? threads.map(thread => <li key={thread}>{thread}</li>)
            : null}
        </ul>
      </Fragment>
    );
  }
}

export default ThreadList;
