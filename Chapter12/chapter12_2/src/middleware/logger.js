const logger = store => next => action => {
  if (console.group) console.group(action.type)

  console.info('dispatching', action)
  const result = next(action)
  console.log('new state', store.getState())

  if (console.groupEnd) console.groupEnd(action.type)
  return result
}

export default logger
