import {
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
  MOVIE_LIST_FAIL,
  MORE_MOVIE_LIST_REQUEST,
  MORE_MOVIE_LIST_SUCCESS,
  MORE_MOVIE_LIST_FAIL,
  MOVIE_DETAILS_REQUEST,
  MOVIE_DETAILS_SUCCESS,
  MOVIE_DETAILS_FAIL
} from '../constants/movieConstants';

export const movieListReducer = (state = { movies: [], page: 1, total_pages: 1 }, action) => {
  switch (action.type) {
    case MOVIE_LIST_REQUEST:
      return { loading: true, movies: [...state.movies] };
    case MORE_MOVIE_LIST_REQUEST:
      return { loading: true, movies: [...state.movies], total_pages: state.total_pages }
    case MOVIE_LIST_SUCCESS:
      return {
        loading: false,
        movies: [...action.payload.results],
        page: action.payload.page,
        total_pages: action.payload.total_pages
      };
    case MORE_MOVIE_LIST_SUCCESS:
      if (action.payload.results) {
        const updatedMovies = state.movies.concat(action.payload.results)
        return {
          loading: false,
          movies: [...updatedMovies],
          page: action.payload.page,
          total_pages: state.total_pages
        };
      } else {
        return state;
      }
    case MOVIE_LIST_FAIL:
    case MORE_MOVIE_LIST_FAIL:
    default:
      return state;
  }
}

export const movieDetailsReducer = (state = { movieDetails: { details: {}, cast: [] } }, action) => {
  switch (action.type) {
    case MOVIE_DETAILS_REQUEST:
      return { loading: true, movieDetails: { details: {}, cast: [] } }
    case MOVIE_DETAILS_SUCCESS:
      return {
        loading: false,
        movieDetails: action.payload
      }
    case MOVIE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}

