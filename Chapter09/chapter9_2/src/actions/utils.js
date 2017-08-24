export const thunkCreator = (action) => {
  const { types, promise, ...rest } = action
  const [ REQUESTED, RESOLVED, REJECTED ] = types

  return (dispatch) => {
    dispatch({ ...rest, type: REQUESTED })

    return promise
      .then(result => {
        if (result.error) throw new Error(result.error)
        dispatch({ ...rest, type: RESOLVED, result })
        return result
      })
      .catch(error => {
        dispatch({ ...rest, type: REJECTED, error })
        throw error
      })
  }
}
