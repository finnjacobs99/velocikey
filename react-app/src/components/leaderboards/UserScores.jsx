import React from 'react';
import { animate } from '../../styles';

const UserScores = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full p-10 border'>
      {/* Labels */}
      <div className='flex text-2xl w-full text-center'>
        <span className='w-1/4'>Time</span>
        <span className='w-1/4'>WPM</span>
        <span className='w-1/4'>Accuracy</span>
        <span className='w-1/4'>Correct</span>
      </div>

      {/* Divider */}
      <div
        className={`w-full my-5 h-1 rounded-full bg-secondary dark:bg-secondary-dark ${animate}`}
      />

      {/* Scores */}
      <div className='flex text-2xl text-center w-full'>
        <span className='w-1/4'>Time</span>
        <span className='w-1/4'>wpm</span>
        <span className='w-1/4'>accuracy</span>
        <span className='w-1/4'>correct</span>
      </div>
    </div>
  );
};

export default UserScores;
