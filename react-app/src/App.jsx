import React, { useState } from 'react';
import {
  Navbar,
  Home,
  Leaderboards,
  Account,
  Footer,
} from './components/index';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  function toggleDarkMode() {
    setDarkMode((prev) => !prev);
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className='flex flex-grow w-full min-h-screen bg-primary dark:bg-primary-dark text-white font-mono transition ease-in-out duration-300'>
        {/* Content Container */}
        <div className='w-full flex flex-col items-center justify-between max-w-screen-2xl mx-auto'>
          <Navbar onClickToggleDark={toggleDarkMode} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/leaderboards' element={<Leaderboards />} />
            <Route path='/account' element={<Account />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
