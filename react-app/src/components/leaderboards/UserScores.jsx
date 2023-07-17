import React, { useEffect, useState } from 'react';
import { animate } from '../../styles';
// import { UserAuth } from '../../contexts/AuthContext';
// import { db } from '../../firebase';
// import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { useTestResults } from '../../contexts/TestResultsContext';

const UserScores = () => {
  const testResults = useTestResults();

  // const [testResults, setTestResults] = useState([]);
  // const { user } = UserAuth();

  // useEffect(() => {
  //   const fetchTestResults = async () => {
  //     if (!user) return;

  //     const q = query(
  //       collection(db, 'users', user.uid, 'testResults'),
  //       orderBy('timestamp', 'desc'),
  //       limit(10)
  //     );
  //     const querySnapshot = await getDocs(q);

  //     const results = [];
  //     querySnapshot.forEach((doc) => {
  //       results.push(doc.data());
  //     });

  //     setTestResults(results);
  //   };

  //   fetchTestResults();
  // }, [user]);

  // useEffect(() => {
  //   console.log(testResults);
  // }, [testResults]);

  return (
    <div className='flex flex-col justify-center items-center w-full p-10'>
      <div className='pb-10 text-2xl'>Your Recent Results:</div>
      {/* Labels */}
      <div className='flex text-2xl w-full text-center'>
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
        <div key={idx} className='flex text-2xl text-center w-full mb-5'>
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
