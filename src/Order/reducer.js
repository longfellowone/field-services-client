import { SEARCH_RESPONSE, SEARCH_ERROR, SEARCH_RESET } from './actions';

export function searchReducer(state, action) {
  switch (action.type) {
    case SEARCH_RESPONSE:
      return {
        ...state,
        data: action.payload.toObject().resultsList.map(product => product),
      };
    case SEARCH_ERROR:
      if (action.payload.message === 'Request was aborted') return state;
      return { ...state, data: [], error: true };
    case SEARCH_RESET:
      return { ...state, data: [] };
    default:
      return state;
  }
}
