import actions from "../actions";

const initialState = {
  menu: [],
  loading: false,
  error: null,
};
function FilterControllReducer(state, action) {
  switch (action.type) {
    case actions.food.DATA_FETCHING:
      return {
        ...state,
        loading: true,
      };

    case actions.food.DATA_FETCHED:
      return {
        ...state,
        menu: action.data,
        loading: false,
      };
    case actions.food.DATA_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.food.FILTER_BY_SELECT:
      return {
        ...state,
        menu: action.data,
      };
    case actions.food.FILTER_BY_FIELD:
      return {
        ...state,
        menu: action.data,
      };
    default:
      return state;
  }
}

export { FilterControllReducer, initialState };
