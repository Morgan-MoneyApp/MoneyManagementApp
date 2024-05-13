import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faPiggyBank, faLandmark } from '@fortawesome/free-solid-svg-icons';
import { getAccounts } from '../utils/accUtils';

import '../styles/accountnavigator.css';

function AccountNavigator() {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get location object
  const [activeAccount, setActiveAccount] = useState('');
  const [accountList, setAccountList] = useState({
    checking: {
      icon: <FontAwesomeIcon icon={faMoneyBillWave} />,
      path: '/checking',
      label: 'Checking Account',
      balance: 1500,
    },
    savings: {
      icon: <FontAwesomeIcon icon={faPiggyBank} />,
      path: '/saving',
      label: 'Savings Account',
      balance: 3000,
    },
    market: {
      icon: <FontAwesomeIcon icon={faLandmark} />,
      path: '/moneymarket',
      label: 'Money Market Account',
      balance: 5000,
    },
  });
  useEffect(() => {
    getAccounts().then(res => {
      if (res) {
        setAccountList({
          checking: {
            icon: <FontAwesomeIcon icon={faMoneyBillWave} />,
            path: '/checking',
            label: 'Checking Account',
            balance: res[0].balance,
          },
          savings: {
            icon: <FontAwesomeIcon icon={faPiggyBank} />,
            path: '/saving',
            label: 'Savings Account',
            balance: res[1].balance,
          },
          market: {
            icon: <FontAwesomeIcon icon={faLandmark} />,
            path: '/moneymarket',
            label: 'Money Market Account',
            balance: res[2].balance,
          },
        });
      }
    });
  }, []);

  // Define account details with paths, icons, and labels
  const accounts = {
    checking: {
      icon: <FontAwesomeIcon icon={faMoneyBillWave} />,
      path: '/checking',
      label: 'Checking Account',
      balance: '$3,200',
    },
    savings: {
      icon: <FontAwesomeIcon icon={faPiggyBank} />,
      path: '/saving',
      label: 'Savings Account',
      balance: '$5,000',
    },
    market: {
      icon: <FontAwesomeIcon icon={faLandmark} />,
      path: '/moneymarket',
      label: 'Money Market Account',
      balance: '$8,750',
    },
  };

  // Set the active account based on the current location path
  useEffect(() => {
    const currentPath = location.pathname;
    const activeKey = Object.keys(accountList).find(key => accountList[key].path === currentPath);
    setActiveAccount(activeKey);
  }, [location]); // React to changes in location

  const handleAccountClick = accountType => {
    setActiveAccount(accountType);
    navigate(accountList[accountType].path);
  };

  return (
    <div className="account-navigator">
      {Object.entries(accountList).map(([key, { icon, label, balance }]) => (
        <div key={key} className={`account-item ${activeAccount === key ? 'active' : ''}`} onClick={() => handleAccountClick(key)}>
          {icon}
          <span className="account-label">{label}</span>
          <span className="account-balance">{balance}</span>
        </div>
      ))}
    </div>
  );
}

export default AccountNavigator;
