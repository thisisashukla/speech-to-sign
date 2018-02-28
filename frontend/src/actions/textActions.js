import dispatcher from "../dispatcher";

export function toGif(text) {
  dispatcher.dispatch({type: "TO_GIF", payload: text})
}
