import {
  ACTOR_LIST_REQUEST,
  ACTOR_LIST_SUCCESS,
  ACTOR_LIST_FAIL,
  MORE_ACTOR_LIST_REQUEST,
  MORE_ACTOR_LIST_SUCCESS,
  MORE_ACTOR_LIST_FAIL
} from '../constants/actorConstants';
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


export const listActors = () => async (dispatch) => {
  try {
    dispatch({ type: ACTOR_LIST_REQUEST });

    const query = gql`
      query Actors {
        actors @rest(type: "Actors", path: "/actors") {
          page
          total_pages
          results {
            id
            name
            profile_path
          }
        }
      }
    `;

    const { data: { actors } } = await client.query({ query });
    console.log(actors)
    dispatch({
      type: ACTOR_LIST_SUCCESS,
      payload: actors
    })
  } catch (error) {
    dispatch({
      type: ACTOR_LIST_FAIL,
      payload: error.response && error.message ?
        error.response.data.message :
        error.message
    })
  }
}

export const listMoreActors = (page) => async (dispatch) => {
  try {
    dispatch({ type: MORE_ACTOR_LIST_REQUEST });

    // Set `RestLink` with your endpoint
    const restLink = new RestLink({ uri: `http://localhost:5000/api/actors?page=${page}` });

    // Setup your client
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: restLink
    });

    const query = gql`
      query Actors{
        actors @rest(type: "Actors", path: "") {
          page
          results {
            id
            name
            profile_path
          }
        }
      }
    `;

    const { data: { actors } } = await client.query({ query });

    dispatch({
      type: MORE_ACTOR_LIST_SUCCESS,
      payload: actors
    })
  } catch (error) {
    dispatch({
      type: MORE_ACTOR_LIST_FAIL,
      payload: error.response && error.message ?
        error.response.data.message :
        error.message
    })
  }
}