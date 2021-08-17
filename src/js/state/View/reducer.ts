import {ViewAction, ViewState} from "./types"

const init: ViewState = {
  downloadsIsOpen: false
}

export default function reducer(
  state: ViewState = init,
  action: ViewAction
): ViewState {
  switch (action.type) {
    case "DOWNLOADS_SHOW":
      return {
        ...state,
        downloadsIsOpen: true
      }
    case "DOWNLOADS_HIDE":
      return {
        ...state,
        downloadsIsOpen: false
      }
    default:
      return state
  }
}
