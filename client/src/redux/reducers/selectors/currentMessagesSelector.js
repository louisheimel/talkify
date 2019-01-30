import currentWorkspaceSelector from "./currentWorkspaceSelector";

export default state =>
  state.threads.workspace.options.find(
    workspace => workspace.name === currentWorkspaceSelector(state)
  );
