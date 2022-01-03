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
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import { gql } from '@apollo/client';

// Set `RestLink` with your endpoint
const restLink = new RestLink({ uri: "http://localhost:5000/api" });

// Setup your client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink
});

export const listMovies = () => async (dispatch) => {
  try {
    dispatch({ type: MOVIE_LIST_REQUEST });

    const query = gql`
      query Movies {
        movies @rest(type: "Movies", path: "/movies") {
          page
          total_pages
          results {
            id
            title 
            poster_path
            vote_average
            vote_count
          }
        }
      }
    `;

    const { data: { movies } } = await client.query({ query });

    dispatch({
      type: MOVIE_LIST_SUCCESS,
      payload: movies
    })
  } catch (error) {
    dispatch({
      type: MOVIE_LIST_FAIL,
      payload: error.response && error.message ?
        error.response.data.message :
        error.message
    })
  }
}

export const listMoreMovies = (page) => async (dispatch) => {
  try {
    dispatch({ type: MORE_MOVIE_LIST_REQUEST });

    // Set `RestLink` with your endpoint
    const restLink = new RestLink({ uri: `http://localhost:5000/api/movies?page=${page}` });

    // Setup your client
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: restLink
    });

    const query = gql`
      query Movies{
        movies @rest(type: "Movies", path: "") {
          page
          results {
            id
            title 
            poster_path
            vote_average
            vote_count
          }
        }
      }
    `;

    const { data: { movies } } = await client.query({ query });

    dispatch({
      type: MORE_MOVIE_LIST_SUCCESS,
      payload: movies
    })
  } catch (error) {
    dispatch({
      type: MORE_MOVIE_LIST_FAIL,
      payload: error.response && error.message ?
        error.response.data.message :
        error.message
    })
  }
}

export const movieDetails = (movieId) => async (dispatch) => {
  try {
    dispatch({ type: MOVIE_DETAILS_REQUEST });

    // Set `RestLink` with your endpoint
    const restLink = new RestLink({ uri: `http://localhost:5000/api/movies/${movieId}` });

    // Setup your client
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: restLink
    });

    const query = gql`
  query MovieDetails{
    movie(id: movieId) @rest(type: "Movie", path: "") {
      title
      vote_average
      vote_count
      tagline
      runtime
      release_date
      poster_path
      backdrop_path
    }
  }
`;

    const { data: { movie } } = await client.query({ query });

    dispatch({
      type: MOVIE_DETAILS_SUCCESS,
      payload: movie
    })


  } catch (error) {
    dispatch({
      type: MOVIE_DETAILS_FAIL,
      payload: error.response && error.message ?
        error.response.data.message :
        error.message
    })
  }
}