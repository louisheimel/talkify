function newMessageReducer(state, action) {
  const { type, payload } = action;
  console.log(payload, " is payload");
  console.log(
    "state.messages.currentChannel is: ",
    state.messages.currentChannel
  );
  const newstate = {
    ...state,
    messages: {
      ...state.messages,
      [state.workspace.current]: {
        [state.currentChannel]: [
          ...((state.messages[state.workspace.current] &&
            state.messages[state.workspace.current][state.currentChannel]) ||
            []),
          payload
        ]
      }
    }
  };
  console.log(newstate);
  return newstate;
}
export default newMessageReducer;
