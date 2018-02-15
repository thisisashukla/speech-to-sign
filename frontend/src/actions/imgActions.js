import dispatcher from "../dispatcher";

export function updateGif(path) {
  dispatcher.dispatch({
    type: "UPDATE_GIF",
    payload: path
  })
}
