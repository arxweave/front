export const PostReducer = (state, { type, payload }) => {
  switch(type) {
    case PostReducer.actionTypes.FETCH_SUCCESS:
      console.log('success', payload)
      return {
        ...state,
        summary: payload
      }
    default:
      return state
  }
}

PostReducer.actionTypes = {
  FETCH_SUCCESS: 'FETCH_SUCCESS'
}
