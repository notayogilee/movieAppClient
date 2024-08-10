import {
  SHOW_LIST_REQUEST,
  SHOW_LIST_SUCCESS,
  SHOW_LIST_FAIL,
  MORE_SHOW_LIST_REQUEST,
  MORE_SHOW_LIST_SUCCESS,
  MORE_SHOW_LIST_FAIL,
  SHOW_DETAILS_REQUEST,
  SHOW_DETAILS_SUCCESS,
  SHOW_DETAILS_FAIL,
} from "../constants/showConstants";

export const showListReducer = (
  state = { shows: [], page: 1, total_pages: 1 },
  action
) => {
  switch (action.type) {
    case SHOW_LIST_REQUEST:
      return { loading: true, shows: [...state.shows] };
    case MORE_SHOW_LIST_REQUEST:
      return {
        loading: false,
        shows: [...state.shows],
        total_pages: state.total_pages,
      };
    case SHOW_LIST_SUCCESS:
      return {
        loading: false,
        shows: [...action.payload.results],
        page: action.payload.page,
        total_pages: action.payload.total_pages,
      };
    case MORE_SHOW_LIST_SUCCESS:
      if (action.payload.results) {
        const updatedShows = state.shows.concat(action.payload.results);
        return {
          loading: false,
          shows: [...updatedShows],
          page: action.payload.page,
          total_pages: state.total_pages,
        };
      } else {
        return state;
      }

    case SHOW_LIST_FAIL:
    case MORE_SHOW_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const showDetailsReducer = (
  state = { showDetails: { details: {}, cast: [] } },
  action
) => {
  switch (action.type) {
    case SHOW_DETAILS_REQUEST:
      return {
        loading: true,
        showDetails: { details: {}, cast: [] },
      };
    case SHOW_DETAILS_SUCCESS:
      return {
        loading: false,
        showDetails: action.payload,
      };
    case SHOW_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
