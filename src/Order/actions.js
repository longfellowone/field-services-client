// export const ADD_ITEM = 'ADD_ITEM';

// export function addItem() {}

// Add to state
//

// export const ActionType = {
//   LOGIN_REQUEST: 'LOGIN_REQUEST',
//   LOGIN_SUCCESS: 'LOGIN_SUCCESS',
//   LOGIN_FAILURE: 'LOGIN_FAILURE',
//   SHOW_MESSAGE: 'SHOW_MESSAGE',
// };

// export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_RESPONSE = 'SEARCH_RESPONSE';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const SEARCH_RESET = 'SEARCH_RESET';

export function searchResponse(response) {
  return { type: SEARCH_RESPONSE, payload: response };
}

export function searchError(error) {
  return { type: SEARCH_ERROR, payload: error };
}

export function searchReset() {
  return { type: SEARCH_RESET };
}
