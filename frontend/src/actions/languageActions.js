import dispatcher from "../dispatcher";

export function updateSrc(lang) {
  dispatcher.dispatch({type: "UPDATE_SRC", payload: lang})
}

export function updateTrgt(lang) {
  dispatcher.dispatch({type: "UPDATE_TRGT", payload: lang})
}
