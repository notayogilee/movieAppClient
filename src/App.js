import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingScreen from './screens/LandingScreen';
import DetailsScreen from './screens/DetailsScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingScreen />} />
        <Route path="/movieDetails" element={<DetailsScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
