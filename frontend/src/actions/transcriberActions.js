import dispatcher from "../dispatcher";

export function start(params) {
  dispatcher.dispatch({type: "START_RECOGNITION", payload: params})
}

export function stop(params) {
  dispatcher.dispatch({type: "STOP_RECOGNITION", payload: params})
}
