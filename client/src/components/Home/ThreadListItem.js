import React from "react";

const liStyles = {
  listStyleType: "none",
  fontSize: "18px",
  fontWeight: "bold",
  letterSpacing: "0.03rem",
  marginLeft: "0"
};
const ThreadListItem = thread => (
  <li style={liStyles} key={thread}>
    {thread}
  </li>
);

export default ThreadListItem;
