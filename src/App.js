import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/utils/Navbar';
import LandingScreen from './components/screens/LandingScreen';
import MoviesScreen from './components/screens/MoviesScreen';
import ShowsScreen from './components/screens/ShowsScreen';
import ActorsScreen from './components/screens/ActorsScreen';
import MovieDetailsScreen from './components/screens/MovieDetailsScreen';
import ShowDetailsScreen from './components/screens/ShowDetailsScreen';
import ActorDetailsScreen from './components/screens/ActorDetailsScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingScreen />} />
        <Route path="/movies" element={<MoviesScreen />} />
        <Route path="/shows" element={<ShowsScreen />} />
        <Route path="/actors" element={<ActorsScreen />} />
        <Route path="/movieDetails" element={<MovieDetailsScreen />} />
        <Route path="/showDetails" element={<ShowDetailsScreen />} />
        <Route path="/actorDetails" element={<ActorDetailsScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
