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
} from '../constants/showConstants';
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

export const listShows = () => async (dispatch) => {
  try {
    dispatch({ type: SHOW_LIST_REQUEST });

    const query = gql`
      query Shows {
        shows @rest(type: "Shows", path: "/shows") {
          page
          total_pages
          results {
            id
            name 
            poster_path
            vote_average
            vote_count
          }
        }
      }
    `;

    const { data: { shows } } = await client.query({ query });

    dispatch({
      type: SHOW_LIST_SUCCESS,
      payload: shows
    })
  } catch (error) {
    dispatch({
      type: SHOW_LIST_FAIL,
      payload: error.response && error.message ?
        error.response.data.message :
        error.message
    })
  }
}

export const listMoreShows = (page) => async (dispatch) => {
  try {
    dispatch({ type: MORE_SHOW_LIST_REQUEST });

    // Set `RestLink` with your endpoint
    const restLink = new RestLink({ uri: `http://localhost:5000/api/shows?page=${page}` });

    // Setup your client
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: restLink
    });

    const query = gql`
      query Shows {
        shows @rest(type: "Shows", path: "") {
          page
          results {
            id
            name 
            poster_path
            vote_average
            vote_count
          }
        }
      }
    `;

    const { data: { shows } } = await client.query({ query });

    dispatch({
      type: MORE_SHOW_LIST_SUCCESS,
      payload: shows
    })
  } catch (error) {
    dispatch({
      type: MORE_SHOW_LIST_FAIL,
      payload: error.response && error.message ?
        error.response.data.message :
        error.message
    })
  }
}

export const showDetails = (showId) => async (dispatch) => {

  const restLink = new RestLink({ uri: `http://localhost:5000/api/shows/${showId}` });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: restLink
  });

  try {
    dispatch({ type: SHOW_DETAILS_REQUEST });

    const query = gql`
      query Show {
        details @rest(type: "Shows", path: "") {
          backdrop_path
          episode_run_time
          homepage
          id
          name
          networks
          number_of_episodes
          number_of_seasons
          overview
          poster_path
          seasons
          vote_average
          vote_count
        }
      }
    `;

    const { data: { details } } = await client.query({ query });

    const showCast = gql`
    query ShowCast{
      cast(id: showId) @rest(type: "Cast", path: "/credits") {
        cast {
          id
          name
          character
          profile_path
        }
      }
    }
    `;

    const { data: { cast } } = await client.query({ query: showCast });
    const fullShowDetails = { details, cast }

    dispatch({
      type: SHOW_DETAILS_SUCCESS,
      payload: fullShowDetails
    })
  } catch (error) {
    dispatch({
      type: SHOW_DETAILS_FAIL,
      payload: error.response && error.message ?
        error.response.data.message :
        error.message
    })
  }
}