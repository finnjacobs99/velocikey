import React, { useState, useEffect } from 'react';

const Scores = ({ userScores }) => {
  const [scores, setScores] = useState(userScores);

  useEffect(() => {
    setScores(userScores);
  }, [userScores]);

  return (
    <div className='flex flex-col justify-center items-center w-full p-10'>
      <div className='flex flex-col'>
        {scores.map((score, index) => {
          return (
            <span key={index}>{`Time: ${score.time} WPM: ${score.wpm.toFixed(
              2
            )} Accuracy: ${score.accuracy} Correct: ${score.wordsCorrect}/${
              score.testLength
            }`}</span>
          );
        })}
      </div>
    </div>
  );
};

export default Scores;
