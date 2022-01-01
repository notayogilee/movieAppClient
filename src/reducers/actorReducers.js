import {
  ACTOR_LIST_REQUEST,
  ACTOR_LIST_SUCCESS,
  ACTOR_LIST_FAIL,
  MORE_ACTOR_LIST_REQUEST,
  MORE_ACTOR_LIST_SUCCESS,
  MORE_ACTOR_LIST_FAIL
} from '../constants/actorConstants';

export const actorListReducer = (state = { actors: [], page: 1 }, action) => {
  switch (action.type) {
    case ACTOR_LIST_REQUEST:
    case MORE_ACTOR_LIST_REQUEST:
      return { loading: true, actors: [...state.actors] };
    case ACTOR_LIST_SUCCESS:
      return {
        loading: false,
        actors: [...action.payload.results],
        page: action.payload.page,
        total_page: action.payload.total_pages
      };
    case MORE_ACTOR_LIST_SUCCESS:
      if (action.payload.results) {
        const updatedActors = state.actors.concat(action.payload.results)
        return {
          loading: false,
          actors: [...updatedActors],
          page: action.payload.page
        };
      } else {
        return state;
      }

    case ACTOR_LIST_FAIL:
    case MORE_ACTOR_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
