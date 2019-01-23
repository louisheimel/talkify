import React from "react";
import ThreadList from "./ThreadList";

const Threads = ({ threads }) =>
  Object.keys(threads).map(threadName => (
    <ThreadList threadName={threadName} threads={threads[threadName]} />
  ));
export default Threads;
