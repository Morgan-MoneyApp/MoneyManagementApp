import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import IntroTeam from './components/IntroTeam';
import HomeReverseInfo from './components/HomeReverseInfo';
import Mission from './components/Mission';
import News from './components/News';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <IntroTeam /> */}
    {/* <HomeReverseInfo/>
    <Mission/>
    <News/> */}
  </React.StrictMode>,
);
