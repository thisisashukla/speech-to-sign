import dispatcher from "../dispatcher";

export function toGif(text) {
  dispatcher.dispatch({type: "GETTING_GIF", payload: text})
}
