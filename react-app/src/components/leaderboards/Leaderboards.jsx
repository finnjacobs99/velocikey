import React from 'react';
import UserScores from './UserScores';
import { UserAuth } from '../../contexts/AuthContext';

const Leaderboards = () => {
  const { user } = UserAuth();

  // 10 previous tests || personal best
  //          Leaderboard

  return (
    <div className='flex flex-col justify-center items-center w-full'>
      {user ? (
        <UserScores />
      ) : (
        <div className='py-10 text-2xl'>
          Sign in to track/view your results!
        </div>
      )}
      {/* <div>Leaderboard</div> */}
    </div>
  );
};

export default Leaderboards;
