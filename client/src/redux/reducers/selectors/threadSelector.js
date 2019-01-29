import { createSelector } from "reselect";

const getWorkspace = store => store.threads.workspace.current;
const getCurrentThread = store => store.threads.currentChannel;
const getAllMessages = store => store.threads.messages;

const getMessages = createSelector(
  [getWorkspace, getCurrentThread, getAllMessages],
  (workspace, currentThread, allMessages) =>
    (allMessages &&
      allMessages[workspace] &&
      allMessages[workspace][currentThread]) ||
    []
);

export default getMessages;
