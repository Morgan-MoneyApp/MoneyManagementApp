import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:8310',
  credentials: true,
  optionsSuccessStatus: 200,
};
App.use(cors(corsOptions));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
