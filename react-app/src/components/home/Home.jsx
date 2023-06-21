import React, { useState } from 'react';
import Test from './test/Test';
import Scores from './Scores';

const Home = () => {
  const [testResults, setTestResults] = useState([]);

  function handleTestResults(result) {
    setTestResults((prev) => [result, ...prev]);
  }

  return (
    <div className='flex flex-col items-center justify-around w-full h-full'>
      <Test onTestComplete={handleTestResults} />
      <Scores userScores={testResults} />
    </div>
  );
};

export default Home;
