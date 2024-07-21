import image from './Assets/ReX_image.avif'; 
import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onStartChat }) => {
  return (
    <div className="landing-page">
      <img className="image-container" src={image} alt="ReX" />
      <h1>Receive Career Help From ReX!</h1>
      <h3>Start a conversation with ReX right now!</h3> 
      <button className="start-chat-button" onClick={onStartChat}>Start Chat</button>
    </div>

  );
};

export default LandingPage;
