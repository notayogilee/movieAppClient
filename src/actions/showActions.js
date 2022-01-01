import {
  SHOW_LIST_REQUEST,
  SHOW_LIST_SUCCESS,
  SHOW_LIST_FAIL,
  MORE_SHOW_LIST_REQUEST,
  MORE_SHOW_LIST_SUCCESS,
  MORE_SHOW_LIST_FAIL
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
          results {
            id
            name 
            overview
            poster_path
            backdrop_path
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
            overview
            poster_path
            backdrop_path
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