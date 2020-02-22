
export const initialState = {
  currentStep: 0,
  article: {}
}

export const PostReducer = (state, { type, payload }) => {
  switch(type) {
    case PostReducer.actionTypes.SEARCH_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case PostReducer.actionTypes.SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        article: payload,
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
