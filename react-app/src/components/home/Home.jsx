import React, { useState } from 'react';
import Test from './test/Test';
import { UserAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

const Home = () => {
  const { user } = UserAuth();

  async function handleTestResults(result) {
    if (!user) return;

    const testResultsRef = collection(db, 'users', user.uid, 'testResults');

    await addDoc(testResultsRef, {
      time: result.time,
      wpm: result.wpm,
      accuracy: result.accuracy,
      testLength: result.testLength,
      wordsCorrect: result.wordsCorrect,
      timestamp: new Date(),
    });
  }

  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <Test onTestComplete={handleTestResults} />
    </div>
  );
};

export default Home;
