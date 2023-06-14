import React, { useState, useEffect } from 'react';
import Test from './components/Test';

const App = () => {
  return (
    <div className='bg-neutral-800 h-screen flex flex-col justify-center items-center text-white font-mono'>
      <Test />
    </div>
  );
};

export default App;
