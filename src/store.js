import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { movieListReducer, movieDetailsReducer } from './reducers/movieReducers';
import { showDetailsReducer, showListReducer } from './reducers/showReducers';
import { actorListReducer } from './reducers/actorReducers';

const reducer = combineReducers({
  movieList: movieListReducer,
  movieDetails: movieDetailsReducer,
  showList: showListReducer,
  showDetails: showDetailsReducer,
  actorList: actorListReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;