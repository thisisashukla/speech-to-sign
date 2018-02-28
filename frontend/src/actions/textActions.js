import dispatcher from "../dispatcher";

export function analyse(text) {
  dispatcher.dispatch({
    type: "ANALYSE_TEXT",
    payload: text
  })
}
