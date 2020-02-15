import Post from "./Post"

export const initialState = {
  currentStep: 0
}

export const PostReducer = (state, { type, payload }) => {
  switch(type) {
    case PostReducer.actionTypes.SEARCH_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case PostReducer.actionTypes.SEARCH_SUCCESS:
      console.log('success', payload)
      return {
        ...state,
        isLoading: false,
        summary: payload,
        currentStep: 1
      }
    case PostReducer.actionTypes.PERMINAFY_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case PostReducer.actionTypes.PERMINAFY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentStep: 2
      }
    case PostReducer.actionTypes.GO_BACK:
      const { current } = state
      return {
        ...state,
        currentStep: current > 0 ? current  - 1 : 0
      }
    case PostReducer.actionTypes.RESET:
      return initialState
    default:
      return state
  }
}

PostReducer.actionTypes = {
  SEARCH_REQUEST: 'SEARCH_REQUEST',
  SEARCH_SUCCESS: 'SEARCH_SUCCESS',
  PERMINAFY_SUCCESS: 'PERMINAFY_SUCCESS',
  PERMINAFY_REQUEST: 'PERMINAFY_REQUEST',
  GO_BACK: 'GO_BACK',
  RESET: 'RESET'
}
