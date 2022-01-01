import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingScreen from './components/screens/LandingScreen';
import MoviesScreen from './components/screens/MoviesScreen';
import ShowsScreen from './components/screens/ShowsScreen';
import ActorsScreen from './components/screens/ActorsScreen';
import MovieDetailsScreen from './components/screens/MovieDetailsScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingScreen />} />
        <Route path="/movies" element={<MoviesScreen />} />
        <Route path="/shows" element={<ShowsScreen />} />
        <Route path="/actors" element={<ActorsScreen />} />
        <Route path="/movieDetails" element={<MovieDetailsScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
