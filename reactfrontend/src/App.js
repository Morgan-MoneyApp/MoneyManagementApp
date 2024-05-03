import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageWelcome from './PageWelcome';
import PageRegistration from './PageRegistration';
import PageAccounts from './PageAccounts';
import PageGoalSaving from './PageGoalSaving';
import PageMeetTheTeam from './PageMeetTheTeam';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<PageWelcome />} />
          <Route path="/accounts" element={<PageAccounts />} />
          <Route path="/tracker" element={<PageGoalSaving />} />
          <Route path="/team" element={<PageMeetTheTeam />} />
          <Route path="/register" element={<PageRegistration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <h1>This is the front end for money management app</h1>
//     </div>
//   );
// }

// export default App;
