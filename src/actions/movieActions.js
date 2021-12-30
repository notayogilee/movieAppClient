import axios from 'axios';
import {
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
  MOVIE_LIST_FAIL,
  MORE_MOVIE_LIST_REQUEST,
  MORE_MOVIE_LIST_SUCCESS,
  MORE_MOVIE_LIST_FAIL
} from '../constants/movieConstants';

export const listMovies = (page = 1) => async (dispatch) => {
  try {
    dispatch({ type: MOVIE_LIST_REQUEST });

    const { data } = await axios.get(`http://localhost:5000/api?page=${page}`);

    dispatch({
      type: MOVIE_LIST_SUCCESS,
      payload: data
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

    const { data } = await axios.get(`http://localhost:5000/api?page=${page}`);

    dispatch({
      type: MORE_MOVIE_LIST_SUCCESS,
      payload: data
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