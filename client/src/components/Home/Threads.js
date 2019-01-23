import React from "react";
import ThreadList from "./ThreadList";

const Threads = ({ threads, showList }) =>
  Object.keys(threads).map(threadName => (
    <ThreadList
      threadName={threadName}
      threads={threads[threadName]}
      showList={showList}
    />
  ));
export default Threads;
