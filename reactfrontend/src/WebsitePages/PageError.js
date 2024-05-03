import React from 'react';
import Photo from './images/error.png';

const ErrorPage = () => {
  return (
    <div
      style={{
        display: 'flex', // Enable flexbox
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        height: '100vh', // Take full viewport height
      }}
    >
      <img src={Photo} alt="Error" />
    </div>
  );
};

export default ErrorPage;
