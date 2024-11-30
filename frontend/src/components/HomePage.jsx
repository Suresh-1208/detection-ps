import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file

function HomePage() {
  return (
    <div className="home-container">
      <div className="content-container">
        <h1 className="title">Welcome to Pedestrian Detection Page</h1>
        <div className="button-container">
          <Link to="/detect" className="button">Detect</Link>
          <Link to="/details" className="button">Details</Link>
          <Link to="/authors" className="button">Authors</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
