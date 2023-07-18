import React from 'react';
import { animate } from '../../styles';
import { useTestResults } from '../../contexts/TestResultsContext';

const UserScores = () => {
  const { testResults, personalBest } = useTestResults();

  return (
    <div className='flex flex-col justify-center items-center w-full p-10'>
      {/* Personal Best */}
      {!personalBest ? null : (
        <div className='flex flex-col w-full items-center justify-center'>
          <div className='text-2xl pb-10'>Personal Best:</div>
          <div className='flex items-center justify-center w-full pb-10 text-xl text-center'>
            <span className='w-1/4'>{`Time: ${personalBest.time}`}</span>
            <span className='w-1/4'>{`WPM: ${personalBest.wpm}`}</span>
            <span className='w-1/4'>{`Accuracy: ${personalBest.accuracy} %`}</span>
            <span className='w-1/4'>{`Correct: ${personalBest.wordsCorrect}/${personalBest.testLength}`}</span>
          </div>
        </div>
      )}

      <div className='py-10 mt-10 text-2xl'>Recent Results:</div>
      {/* Labels */}
      <div className='flex text-xl w-full text-center'>
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
      {testResults.map((result, idx) => (
        <div key={idx} className='flex text-xl text-center w-full mb-5'>
          <span className='w-1/4'>{`${result.time.toFixed(2)}s`}</span>
          <span className='w-1/4'>{result.wpm.toFixed(2)}</span>
          <span className='w-1/4'>{`${result.accuracy.toFixed(2)} %`}</span>
          <span className='w-1/4'>{`${result.wordsCorrect}/${result.testLength}`}</span>
        </div>
      ))}
    </div>
  );
};

export default UserScores;
