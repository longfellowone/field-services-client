export const searchReducer = (state, action) => {
  switch (action.type) {
    case 'searchResponse':
      return {
        ...state,
        data: action.payload.toObject().resultsList.map(product => product),
      };
    case 'searchError':
      if (action.payload.message === 'Request was aborted') return state;
      return { ...state, data: [], error: true };
    case 'searchReset':
      return { ...state, data: [] };
    default:
      return state;
  }
};
