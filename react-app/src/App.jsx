import React, { useState, useEffect } from 'react';
import { Test, Navbar } from './components/index';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [testHistory, setTestHistory] = useState([]);

  function toggleDarkMode() {
    setDarkMode((prev) => !prev);
  }

  function handleTestResults(results) {
    setTestHistory((prev) => [...prev, results]);
  }

  useEffect(() => {
    console.log(testHistory);
  }, [testHistory, handleTestResults]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className='flex flex-grow w-full min-h-screen bg-primary dark:bg-primary-dark text-white font-mono transition ease-in-out duration-300'>
        {/* Content Container */}
        <div className='flex flex-col items-center max-w-screen-2xl mx-auto relative'>
          <Navbar onClickToggleDark={toggleDarkMode} />
          <div className='my-auto'>
            <Test onTestComplete={handleTestResults} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
