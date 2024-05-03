import React, { useState } from 'react';
import '../styles/savingstracker.css'; // Ensure the CSS file is imported
import PotGold from '../images/money.png';

function SavingsTracker() {
  const goal = 1000; // Example total goal
  const [saved, setSaved] = useState(0); // Amount currently saved
  const progress = (saved / goal) * 100; // Calculate progress as a percentage

  const addSavings = () => {
    const amount = 100; // Amount to add when the button is clicked
    if (saved + amount <= goal) {
      setSaved(saved + amount);
    }
  };

  return (
    <div className="goal-tracker">
      <h1 className="title">Savings Goal Tracker</h1>
      <div className="progress-bar-background">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
        <img src={PotGold} className="pot-of-gold" alt="Pot of Gold" />
      </div>
      <p className="saved-amount">
        Saved: ${saved} of ${goal}
      </p>
      <button className="add-savings" onClick={addSavings}>
        Add $100
      </button>
    </div>
  );
}

export default SavingsTracker;
