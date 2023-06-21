import React, { useState } from 'react';
import Test from './test/Test';
import Scores from './Scores';

const Home = () => {
  const [testResults, setTestResults] = useState([]);

  function handleTestResults(result) {
    setTestResults((prev) => [result, ...prev]);
  }

  return (
    <div>
      <Test onTestComplete={handleTestResults} />
      <Scores userScores={testResults} />
    </div>
  );
};

export default Home;
