import dispatcher from "../dispatcher";

export function startRecording(path) {
  dispatcher.dispatch({
    type: "START_RECORDING",
    // payload: path
  })
}

export function stopRecording() {
  dispatcher.dispatch({
    type: "STOP_RECORDING",
  })
}
