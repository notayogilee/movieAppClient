import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { movieListReducer } from './reducers/movieReducers';
import { showListReducer } from './reducers/showReducers';
import { actorListReducer } from './reducers/actorReducers';

const reducer = combineReducers({
  movieList: movieListReducer,
  showList: showListReducer,
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