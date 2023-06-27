import React, { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { UserAuth } from '../../contexts/AuthContext';
import { animate } from '../../styles';

const Account = () => {
  const [hasAccount, setHasAccount] = useState(false);
  const { user, logout } = UserAuth();

  function toggleForm() {
    setHasAccount((prev) => !prev);
  }

  async function handleLogout() {
    try {
      await logout();
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
          <SignUp onClickToggleForm={toggleForm} />
        )}
      </div>
    );
  }

  function renderAccount() {
    return (
      <div className='flex flex-col border'>
        <span>Logged in as: {user.email}</span>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    );
  }

  return !user ? renderLogin() : renderAccount();
};

export default Account;
