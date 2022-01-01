import {
  SHOW_LIST_REQUEST,
  SHOW_LIST_SUCCESS,
  SHOW_LIST_FAIL,
  MORE_SHOW_LIST_REQUEST,
  MORE_SHOW_LIST_SUCCESS,
  MORE_SHOW_LIST_FAIL
} from '../constants/showConstants';

export const showListReducer = (state = { shows: [], page: 1 }, action) => {
  switch (action.type) {
    case SHOW_LIST_REQUEST:
    case MORE_SHOW_LIST_REQUEST:
      return { loading: true, shows: [...state.shows] };
    case SHOW_LIST_SUCCESS:
      return {
        loading: false,
        shows: [...action.payload.results],
        page: action.payload.page
      };
    case MORE_SHOW_LIST_SUCCESS:
      if (action.payload.results) {
        const updatedShows = state.shows.concat(action.payload.results)
        return {
          loading: false,
          shows: [...updatedShows],
          page: action.payload.page
        };
      } else {
        return state;
      }

    case SHOW_LIST_FAIL:
    case MORE_SHOW_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
