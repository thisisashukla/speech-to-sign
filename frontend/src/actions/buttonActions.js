import dispatcher from "../dispatcher";

export function startRecording(path) {
  dispatcher.dispatch({type: "START_RECORDING"})
}

export function stopRecording() {
  dispatcher.dispatch({type: "STOP_RECORDING"})
}

export function sttApiCall(speechBlob) {
  dispatcher.dispatch({type: "SPEECH_TO_TEXT", payload: speechBlob})
}
