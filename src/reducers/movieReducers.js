import {
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
  MOVIE_LIST_FAIL,
  MORE_MOVIE_LIST_REQUEST,
  MORE_MOVIE_LIST_SUCCESS,
  MORE_MOVIE_LIST_FAIL
} from '../constants/movieConstants';

export const movieListReducer = (state = { movies: [], page: 1 }, action) => {
  switch (action.type) {
    case MOVIE_LIST_REQUEST:
    case MORE_MOVIE_LIST_REQUEST:
      return { loading: true, movies: [...state.movies] };
    case MOVIE_LIST_SUCCESS:
      return {
        loading: false,
        movies: [...action.payload.results],
        page: action.payload.page
      };
    case MORE_MOVIE_LIST_SUCCESS:
      if (action.payload.results) {
        const updatedMovies = state.movies.concat(action.payload.results)
        return {
          loading: false,
          movies: [...updatedMovies],
          page: action.payload.page
        };
      } else {
        return state;
      }

    case MOVIE_LIST_FAIL:
    case MORE_MOVIE_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
