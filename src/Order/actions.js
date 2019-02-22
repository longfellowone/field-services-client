// export const ActionType = {
//   LOGIN_REQUEST: 'LOGIN_REQUEST',
//   LOGIN_SUCCESS: 'LOGIN_SUCCESS',
//   LOGIN_FAILURE: 'LOGIN_FAILURE',
//   SHOW_MESSAGE: 'SHOW_MESSAGE',
// };

export const SEARCH_RESPONSE = 'SEARCH_RESPONSE';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const SEARCH_RESET = 'SEARCH_RESET';

export function searchResponse(response) {
  return { type: SEARCH_RESPONSE, payload: response };
}

export function searchError(error) {
  return { type: SEARCH_ERROR, payload: error };
}
