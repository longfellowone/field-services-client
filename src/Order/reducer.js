export const searchReducer = (state, action) => {
  switch (action.type) {
    case 'searchResponse':
      return { results: action.results };
    case 'searchError':
      return { results: [{ name: 'Cannot connect to server' }] };
    case 'searchReset':
      return { results: [] };
    default:
      return state;
  }
};
