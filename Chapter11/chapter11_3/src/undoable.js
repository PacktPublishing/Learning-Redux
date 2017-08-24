export const actionTypes = {
  UNDO: 'UNDO',
  REDO: 'REDO'
}

export const undo = () => {
  return { type: actionTypes.UNDO }
}

export const redo = () => {
  return { type: actionTypes.REDO }
}

export default function undoable (reducer) {
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: []
  }

  return function enhancedReducer (state = initialState, action) {
    const { past, present, future } = state

    switch (action.type) {
      case actionTypes.UNDO: {
        if (past.length <= 0) return state
        const previous = past[past.length - 1]
        const newPast = past.slice(0, past.length - 1)
        const newFuture = [present, ...future]
        return {
          past: newPast,
          present: previous,
          future: newFuture
        }
      }

      case actionTypes.REDO: {
        if (future.length <= 0) return state
        const next = future[0]
        const newFuture = future.slice(1)
        const newPast = [...past, present]
        return {
          past: newPast,
          present: next,
          future: newFuture
        }
      }

      default: {
        const newPresent = reducer(present, action)

        if (present === newPresent) {
          return state
        }

        return {
          past: [...past, present],
          present: newPresent,
          future: []
        }
      }
    }
  }
}
