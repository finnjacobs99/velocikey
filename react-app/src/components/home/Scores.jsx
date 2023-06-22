import React, { useState, useEffect } from 'react';

const Scores = ({ userScores }) => {
  const [scores, setScores] = useState(userScores);

  useEffect(() => {
    setScores(userScores);
  }, [userScores]);

  return (
    <div className='flex flex-col justify-center items-center w-full p-10'>
      {/* Labels */}
      <div className='flex text-2xl w-full text-center py-5'>
        <label className='w-1/4'>Time</label>
        <label className='w-1/4'>WPM</label>
        <label className='w-1/4'>Accuracy</label>
        <label className='w-1/4'>Correct</label>
      </div>

      {/* Divider */}
      <div className='w-full bg-secondary dark:bg-secondary-dark h-[2px] rounded-full transition ease-in-out duration-300' />

      {/* Scores */}
      <div className='flex flex-col w-full py-5'>
        {scores.map((score, index) => {
          const time = `${score.time.toFixed(2)}s`;
          const wpm = score.wpm.toFixed(2);
          const acc = `${score.accuracy.toFixed(2)}%`;
          const correct = `${score.wordsCorrect}/${score.testLength}`;
          return (
            <div key={index} className='flex text-2xl text-center'>
              <span className='w-1/4'>{time}</span>
              <span className='w-1/4'>{wpm}</span>
              <span className='w-1/4'>{acc}</span>
              <span className='w-1/4'>{correct}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Scores;
