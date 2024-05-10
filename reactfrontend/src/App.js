import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageWelcome from './WebsitePages/PageWelcome';
import PageRegistration from './WebsitePages/PageRegistration';
import PageAccounts from './WebsitePages/PageAccounts';
import PageGoalSaving from './WebsitePages/PageGoalSaving';
import PageMeetTheTeam from './WebsitePages/PageMeetTheTeam';
import PageCheckingAcct from './WebsitePages/PageCheckingAcct';
import PageSavingAcct from './WebsitePages/PageSavingAcct';
import PageMoneyMarketAcct from './WebsitePages/PageMoneyMarketAcct';
import WelcomeLanding from './components/WelcomeLanding';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageWelcome />} />
        <Route path="/accounts" element={<PageAccounts />} />
        <Route path="/tracker" element={<PageGoalSaving />} />
        <Route path="/team" element={<PageMeetTheTeam />} />
        <Route path="/signup" element={<PageRegistration />} />
        <Route path="/checking" element={<PageCheckingAcct />} />
        <Route path="/saving" element={<PageSavingAcct />} />
        <Route path="/moneymarket" element={<PageMoneyMarketAcct />} />
        <Route path="/landing" element={<WelcomeLanding />} />
      </Routes>
    </Router>
  );
}

export default App;
