import {
  ACTOR_LIST_REQUEST,
  ACTOR_LIST_SUCCESS,
  ACTOR_LIST_FAIL,
  MORE_ACTOR_LIST_REQUEST,
  MORE_ACTOR_LIST_SUCCESS,
  MORE_ACTOR_LIST_FAIL,
  ACTOR_DETAILS_REQUEST,
  ACTOR_DETAILS_SUCCESS,
  ACTOR_DETAILS_FAIL,
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
            adult
          }
        }
      }
    `;

    const { data: { actors } } = await client.query({ query });

    const censoredActors = { ...actors, results: actors.results.filter((actor) => !actor.adult) };

    dispatch({
      type: ACTOR_LIST_SUCCESS,
      payload: censoredActors
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

    const restLink = new RestLink({ uri: `http://localhost:5000/api/actors?page=${page}` });
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
            adult
          }
        }
      }
    `;

    const { data: { actors } } = await client.query({ query });

    const censoredActors = { ...actors, results: actors.results.filter((actor) => !actor.adult) };

    dispatch({
      type: MORE_ACTOR_LIST_SUCCESS,
      payload: censoredActors
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

export const actorDetails = (actorId) => async (dispatch) => {
  const restLink = new RestLink({ uri: `http://localhost:5000/api/actors/${actorId}` });
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: restLink
  });

  try {
    dispatch({ type: ACTOR_DETAILS_REQUEST });

    // main details
    const actorDetails = gql`
      query ActorDetails {
        details @rest(type: "Actors", path: "") {
          biography
          birthday
          deathday
          place_of_birth
          id
          imdb_id
          homepage
          name
          profile_path
        }
      }
    `;

    const { data: { details } } = await client.query({ query: actorDetails });

    // movie credits
    const actorMovieCredits = gql`
      query ActorMovieCredits {
        movieCredits(id:actorId) @rest(type: "ActorMovies", path: "/movies") {
          cast {
            id
            title
            character
            release_date
            poster_path
            adult
          }
        }
      }
    `;

    const { data: { movieCredits } } = await client.query({ query: actorMovieCredits });

    console.log(movieCredits)
    const censoredMovieCredits = { ...movieCredits, cast: movieCredits.cast.filter((movie) => !movie.adult) };

    // tv show credits
    const actorShowCredits = gql`
    query ActorShowCredits {
      showCredits(id:actorId) @rest(type: "ActorShows", path: "/shows") {
        cast {
          id
          name
          character
          first_air_date
          poster_path
        }
      }
    }
  `;

    const { data: { showCredits } } = await client.query({ query: actorShowCredits });

    // actor images
    const extraActorImages = gql`
    query ActorImages {
      actorImages(id:actorId) @rest(type: "ActorImages", path: "/images") {
        profiles{
          height
          width
          aspect_ratio
          file_path
        }
      }
    }
  `;

    const { data: { actorImages } } = await client.query({ query: extraActorImages });

    const fullActorDetails = { details, actorImages, censoredMovieCredits, showCredits }

    dispatch({
      type: ACTOR_DETAILS_SUCCESS,
      payload: fullActorDetails
    })
  } catch (error) {
    dispatch({
      type: ACTOR_DETAILS_FAIL,
      payload: error.response && error.message ?
        error.response.data.message :
        error.message
    })
  }
}