import React from 'react';
import './About.css';

export default function About() {
  return (
    <div className="about-container" role="main" aria-label="About us section">
      <div className="overlay"></div>
      <div className="about-box">
        <h1 className="about">About Us</h1>
        <p>
          We are passionate about watches and committed to bringing you the best collection of timepieces.
          Our mission is to provide quality, style, and excellence in every watch we offer.
          Explore our curated collections and find your perfect watch today.
        </p>
       <img src="/github.png" alt="GitHub Logo" width='80px' height='50px'></img>
         <a 
  href="https://github.com/NaveenKumar2003/watch-website" class='github'
  >Git Hub</a>
      </div>
    </div>
  );
}

