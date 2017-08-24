import { INCREMENT, DECREMENT, RESET, UNDO, REDO } from '../actionTypes'

const initialState = {
  history: [0],
  currentState: 0
}

export default function counterReducer (state = initialState, action) {
  const { history, currentState } = state
  const count = history[currentState]

  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        history: [ ...history, count + 1 ],
        currentState: history.length
      }

    case DECREMENT:
      return {
        ...state,
        history: [ ...history, count - 1 ],
        currentState: history.length
      }

    case RESET:
      return {
        ...state,
        history: [ ...history, 0 ],
        currentState: history.length
      }

    case UNDO:
      return {
        ...state,
        currentState: currentState <= 0
          ? currentState
          : currentState - 1
      }

    case REDO:
      return {
        ...state,
        currentState: currentState >= history.length - 1
          ? currentState
          : currentState + 1
      }

    default:
      return state
  }
}
