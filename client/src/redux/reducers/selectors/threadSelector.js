import { createSelector } from "reselect";

import getAllMessages from "./currentMessagesSelector";

const getMessages = createSelector(
  [getAllMessages],
  allMessages => allMessages.messages
);

export default getMessages;
