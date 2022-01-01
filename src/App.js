import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingScreen from './components/screens/LandingScreen';
import MoviesScreen from './components/screens/MoviesScreen';
import DetailsScreen from './components/screens/DetailsScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingScreen />} />
        <Route path="/movies" element={<MoviesScreen />} />
        <Route path="/movieDetails" element={<DetailsScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
