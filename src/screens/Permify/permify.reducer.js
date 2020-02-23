
export const initialState = {
  currentStep: 0,
  summary: {}
}

export const PermifyReducer = (state, { type, payload }) => {
  switch(type) {
    case PermifyReducer.actionTypes.SEARCH_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case PermifyReducer.actionTypes.SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        summary: payload,
        currentStep: 1
      }
    case PermifyReducer.actionTypes.PERMINAFY_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case PermifyReducer.actionTypes.PERMINAFY_SUCCESS:
      console.log('SUCCESS', payload)
      return {
        ...state,
        permaID: payload.permaID,
        isLoading: false,
        currentStep: 2
      }
    case PermifyReducer.actionTypes.GO_BACK:
      const { current } = state
      return {
        ...state,
        currentStep: current > 0 ? current  - 1 : 0
      }
    case PermifyReducer.actionTypes.RESET:
      return initialState
    default:
      return state
  }
}

PermifyReducer.actionTypes = {
  SEARCH_REQUEST: 'SEARCH_REQUEST',
  SEARCH_SUCCESS: 'SEARCH_SUCCESS',
  PERMINAFY_SUCCESS: 'PERMINAFY_SUCCESS',
  PERMINAFY_REQUEST: 'PERMINAFY_REQUEST',
  GO_BACK: 'GO_BACK',
  RESET: 'RESET'
}
