import { SEARCH_RESPONSE, SEARCH_ERROR, SEARCH_RESET } from './actions';

export function searchReducer(state, action) {
  switch (action.type) {
    case SEARCH_RESPONSE:
      return {
        ...state,
        data: action.payload.toObject().resultsList.map(product => product),
      };
    case SEARCH_ERROR:
      return { ...state, data: [] };
    case SEARCH_RESET:
      return { ...state, data: [] };
    default:
      return state;
  }
}
