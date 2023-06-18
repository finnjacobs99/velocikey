import React, { useState, useEffect } from 'react';
import { Test, Navbar, Scores } from './components/index';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [testResults, setTestResults] = useState([]);

  function toggleDarkMode() {
    setDarkMode((prev) => !prev);
  }

  // Gross duisgusting fucking slunt hack
  function handleTestResults(result) {
    setTestResults((prev) => [result, ...prev]);
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className='flex flex-grow w-full min-h-screen bg-primary dark:bg-primary-dark text-white font-mono transition ease-in-out duration-300'>
        {/* Content Container */}
        <div className='flex flex-col items-center max-w-screen-2xl mx-auto'>
          <Navbar onClickToggleDark={toggleDarkMode} />
          {/* <div className='my-auto'> */}
          <Test onTestComplete={handleTestResults} />
          {/* </div> */}
          <Scores userScores={testResults} />
        </div>
      </div>
    </div>
  );
};

export default App;
