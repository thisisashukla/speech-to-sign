import dispatcher from "../dispatcher";

export function updateGif(path) {
  dispatcher.dispatch({
    type: "UPDATE_GIF",
    payload: path
  })
}

export function defaultGif() {
  dispatcher.dispatch({
    type: "DEFAULT_GIF",
  })
}
