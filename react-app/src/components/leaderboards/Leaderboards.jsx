import React from 'react';
import UserScores from './UserScores';
import { UserAuth } from '../../contexts/AuthContext';

const Leaderboards = () => {
  const { user } = UserAuth();

  // 10 previous tests || personal best
  //          Leaderboard

  return (
    <div className='flex flex-col justify-center items-center w-full'>
      <h1 className='text-2xl'>Your Test Results:</h1>
      {user ? <UserScores /> : <div>Sign in to track your scores</div>}
      {/* <div>Leaderboard</div> */}
    </div>
  );
};

export default Leaderboards;
