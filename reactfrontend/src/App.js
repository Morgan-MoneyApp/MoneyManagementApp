import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageWelcome from './WebsitePages/PageWelcome';
import PageRegistration from './WebsitePages/PageRegistration';
import PageAccounts from './WebsitePages/PageAccounts';
import PageGoalSaving from './WebsitePages/PageGoalSaving';
import PageMeetTheTeam from './WebsitePages/PageMeetTheTeam';
import TransactionChecking from './components/TransactionChecking';
import TransactionSaving from './components/TransactionSaving';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<PageWelcome />} />
          <Route path="/accounts" element={<PageAccounts />} />
          <Route path="/tracker" element={<PageGoalSaving />} />
          <Route path="/team" element={<PageMeetTheTeam />} />
          <Route path="/signup" element={<PageRegistration />} />
          <Route path="/checking" element={<TransactionChecking />} />
          <Route path="/saving" element={<TransactionSaving />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
