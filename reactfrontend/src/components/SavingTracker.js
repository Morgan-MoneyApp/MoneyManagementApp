import React, { useState } from 'react';
import '../styles/savingstracker.css'; // Ensure the CSS file is imported
import PotGold from '../images/tracker.png';

function SavingsTracker() {
  const [goal, setGoal] = useState(1000);
  const [purpose, setPurpose] = useState('');
  const [saved, setSaved] = useState(0);
  const progress = (saved / goal) * 100;

  const addSavings = () => {
    const amount = 100;
    setSaved(prevSaved => (prevSaved + amount > goal ? goal : prevSaved + amount));
  };

  return (
    <div className="savings-container">
      <div className="savings-content">
        <div className="savings-form">
          <h1>Set Your Savings Goal</h1>
          <input type="number" placeholder="Enter your goal amount" value={goal} onChange={e => setGoal(Number(e.target.value))} />
          <input type="text" placeholder="What are you saving for?" value={purpose} onChange={e => setPurpose(e.target.value)} />
          <button className="add100" onClick={addSavings}>
            Add $100
          </button>
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
            Saved: ${saved.toLocaleString()} of ${goal.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SavingsTracker;
