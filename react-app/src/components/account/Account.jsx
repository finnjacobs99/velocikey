import React, { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { UserAuth } from '../../contexts/AuthContext';

const Account = () => {
  const [hasAccount, setHasAccount] = useState(
    localStorage.getItem('hasAccount') === 'true'
  );
  const [displayName, setDisplayName] = useState('');
  const { user, logout } = UserAuth();

  function getDisplayName(displayName) {
    setDisplayName(displayName);
  }

  function toggleForm() {
    localStorage.setItem('hasAccount', hasAccount ? 'false' : 'true');
    setHasAccount((prev) => !prev);
  }

  async function handleLogout() {
    try {
      await logout();
      setDisplayName('');
      console.log('Logged out');
    } catch (e) {
      console.log(e.message);
    }
  }

  function renderLogin() {
    return (
      <div className='flex flex-col justify-evenly min-w-[25%]'>
        {hasAccount ? (
          <SignIn onClickToggleForm={toggleForm} />
        ) : (
          <SignUp onCreate={getDisplayName} onClickToggleForm={toggleForm} />
        )}
      </div>
    );
  }

  function renderAccount() {
    return (
      <div className='flex flex-col'>
        <span>
          Logged in as: {displayName.length ? displayName : user.displayName}
        </span>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    );
  }

  return user ? renderAccount() : renderLogin();
};

export default Account;
