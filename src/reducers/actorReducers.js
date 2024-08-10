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
} from "../constants/actorConstants";

export const actorListReducer = (
  state = { actors: [], page: 1, total_pages: 1 },
  action
) => {
  switch (action.type) {
    case ACTOR_LIST_REQUEST:
      return { loading: true, actors: [...state.actors] };
    case MORE_ACTOR_LIST_REQUEST:
      return {
        loading: false,
        actors: [...state.actors],
        total_pages: state.total_pages,
      };
    case ACTOR_LIST_SUCCESS:
      return {
        loading: false,
        actors: [...action.payload.results],
        page: action.payload.page,
        total_pages: action.payload.total_pages,
      };
    case MORE_ACTOR_LIST_SUCCESS:
      if (action.payload.results) {
        const updatedActors = state.actors.concat(action.payload.results);
        return {
          loading: false,
          actors: [...updatedActors],
          page: action.payload.page,
          total_pages: state.total_pages,
        };
      } else {
        return state;
      }

    case ACTOR_LIST_FAIL:
    case MORE_ACTOR_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const actorDetailsReducer = (
  state = {
    actorDetails: {
      details: {},
      actorImages: [],
      censoredMovieCredits: [],
      showCredits: [],
    },
  },
  action
) => {
  switch (action.type) {
    case ACTOR_DETAILS_REQUEST:
      return {
        loading: true,
        actorDetails: {
          details: {},
          actorImages: [],
          censoredMovieCredits: [],
          showCredits: [],
        },
      };
    case ACTOR_DETAILS_SUCCESS:
      return {
        loading: false,
        actorDetails: action.payload,
      };
    case ACTOR_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
