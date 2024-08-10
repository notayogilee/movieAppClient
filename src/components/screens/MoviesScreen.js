import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainList from "../utils/MainList";
import { listMovies, listMoreMovies } from "../../actions/movieActions";

const Movies = () => {
  const dispatch = useDispatch();

  const movieList = useSelector((state) => state.movieList);
  const { loading, movies, page, total_pages } = movieList;

  const [showToTopButton, setShowToTopButton] = useState(false);
  const [bottom, setBottom] = useState(false);

  useEffect(() => {
    window.scrollY <= 1000
      ? setShowToTopButton(false)
      : setShowToTopButton(true);

    let fetchingMovies = true;
    const fetchMovies = async () => {
      if (movies.length === 0 && fetchingMovies) {
        await dispatch(listMovies());
      } else if (bottom && fetchingMovies) {
        await dispatch(listMoreMovies(page + 1));
      }
    };
    fetchMovies();
    return () => {
      fetchingMovies = false;
      setBottom(false);
    };
  }, [bottom]);

  // for inifinite scroll
  window.onscroll = function () {
    let d = document.documentElement;
    let offset = d.scrollTop + window.innerHeight;
    let height = d.offsetHeight;

    // when almost at bottom - load more movies
    const nextPage = page + 1;
    if (offset + 500 >= height && nextPage <= total_pages) {
      setBottom(true);
    }
  };

  return (
    <MainList
      type="Movies"
      items={movies}
      loading={loading}
      showToTopButton={showToTopButton}
    />
  );
};

export default Movies;
