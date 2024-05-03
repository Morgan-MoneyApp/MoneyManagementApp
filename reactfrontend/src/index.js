import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LoginBox from './LoginBox';
import Navbar from './Navbar';
import Footer from './Footer';
import Accounts from './Accounts';
import SavingsTracker from './SavingTracker';
import Team from './Team';
import Registration from './Registration';
import PageAccounts from './PageAccounts';
import PageWelcome from './PageWelcome';
import PageGoalSaving from './PageGoalSaving';
import PageError from './PageError';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
