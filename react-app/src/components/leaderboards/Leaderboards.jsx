import React from 'react';
import UserScores from './UserScores';
import { UserAuth } from '../../contexts/AuthContext';
import { useTestResults } from '../../contexts/TestResultsContext';
import { animate } from '../../styles';

const Leaderboards = () => {
  const { user } = UserAuth();
  const { leaderboard } = useTestResults();

  return (
    // Personal best / results
    <div className='flex flex-col justify-center items-center w-full'>
      {user ? (
        <UserScores />
      ) : (
        <div className='py-10 text-2xl'>
          <a href='/account' className='underline'>
            Sign in
          </a>{' '}
          to track/view your results!
        </div>
      )}

      {/* Leaderboard */}
      <div className='flex flex-col justify-center items-center w-full p-10 mt-10'>
        <h1 className='text-2xl pb-5'>Leaderboard</h1>
        <div
          className={`w-full my-5 h-1 rounded-full bg-secondary dark:bg-secondary-dark ${animate}`}
        />
        {leaderboard.map((result, idx) => (
          <div key={idx} className='flex w-full text-center mb-5 text-xl'>
            <span className='w-1/5 text-left pl-28'>{`${result.displayName}`}</span>
            <span className='w-1/5 text-left pl-28'>{`${result.bestTime}s`}</span>
            <span className='w-1/5'>{`${result.bestWpm}`}</span>
            <span className='w-1/5 text-right pr-28'>{`${result.bestAccuracy} %`}</span>
            <span className='w-1/5 text-right pr-28'>{`${result.bestWordsCorrect}/${result.bestTestLength}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboards;
