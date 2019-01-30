function newMessageReducer(state, action) {
  const { type, payload } = action;
  console.log(payload, " is payload");
  console.log(
    "currentChannel is: ",
    state.workspace.options.find(
      option => option.name === state.workspace.current
    ).currentChannel
  );
  // update getCurrentMessages(state).messages)
  const newstate = {
    ...state,
    workspace: {
      ...state.workspace,
      options: [
        ...state.workspace.options.filter(
          option => option.name !== state.workspace.current
        ),
        {
          ...state.workspace.options.find(
            option => option.name === state.workspace.current
          ),
          messages: [
            ...state.workspace.options.find(
              option => option.name === state.workspace.current
            ).messages,
            payload
          ]
        }
      ]
    }
  };

  console.log(newstate);
  return newstate;
}
export default newMessageReducer;
