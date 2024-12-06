import React from 'react';
import './AuthorsPage.css';
import authorImage from './Shilin.jpg';
import authorImage1 from './suresh.jpg'; // Ensure this path and extension are correct

function AuthorsPage() {
  return (
    <div className="authors-page-container">
      <div className="authors-content">
        <h1>About the Authors</h1>
        {/* Correct usage of the imported image */}
        <img src={authorImage} alt="Author" className="author-image" />
        <p>Varshini Shilin</p>
        <img src={authorImage1} alt="Author" className="author-image" />
        <p>Suresh Babu K</p>
        <p>This application was developed by a dedicated team of AI enthusiasts.</p>
        <p>
          An Artificial Intelligence and Data Science student at Kongu Engineering College, Erode.
          Graduating in 2026 and looking for a responsible position to gain practical knowledge.
          A full-stack web developer and a competitive coder.
          I love designing fully responsive websites.
          I have a keen interest in developing projects, whenever I want to learn something new.
          And I am also a blogger.
        </p>
      </div>
    </div>
  );
}

export default AuthorsPage;
