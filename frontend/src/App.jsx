
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';// Ensure the case matches the actual file
import DetectionPage from './components/DetectionPage';
import DetailsPage from './components/DetailsPage';
import AuthorsPage from './components/AuthorsPage';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detect" element={<DetectionPage />} />
        <Route path="/details" element={<DetailsPage />} />
        <Route path="/authors" element={<AuthorsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
