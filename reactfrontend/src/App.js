import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageWelcome from './WebsitePages/PageWelcome';
import PageRegistration from './WebsitePages/PageRegistration';
import PageAccounts from './WebsitePages/PageAccounts';
import PageGoalSaving from './WebsitePages/PageGoalSaving';
import PageMeetTheTeam from './WebsitePages/PageMeetTheTeam';

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
