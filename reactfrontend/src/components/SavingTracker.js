import React, { useState } from 'react';
import '../styles/savingstracker.css'; // Ensure the CSS file is imported
import PotGold from '../images/tracker.png';

function SavingsTracker() {
  const [goal, setGoal] = useState(1000); // Make the goal adjustable
  const [purpose, setPurpose] = useState(''); // Purpose of the savings
  const [saved, setSaved] = useState(0); // Amount currently saved
  const progress = (saved / goal) * 100; // Calculate progress as a percentage

  const addSavings = () => {
    const amount = 100; // Amount to add when the button is clicked
    if (saved + amount <= goal) {
      setSaved(saved + amount);
    }
  };

  const handleGoalChange = event => {
    setGoal(Number(event.target.value));
  };

  const handlePurposeChange = event => {
    setPurpose(event.target.value);
  };

  return (
    <div className="savings-container">
      <div className="savings-content">
        {' '}
        {/* Flex container for both elements */}
        <div className="savings-form">
          <h1>Set Your Savings Goal</h1>
          <input type="number" placeholder="Enter your goal amount" value={goal} onChange={handleGoalChange} />
          <input type="text" placeholder="What are you saving for?" value={purpose} onChange={handlePurposeChange} />
          <button onClick={addSavings}>Add $100</button>
        </div>
        <div className="goal-tracker">
          <h1 className="title">Savings Goal Tracker: {purpose}</h1>
          <div className="progress-bar-background">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}>
              <img
                src={PotGold}
                className="pot-of-gold"
                alt="Pot of Gold"
                style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
              />
            </div>
          </div>
          <p className="saved-amount">
            Saved: ${saved} of ${goal}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SavingsTracker;
