import React, { useEffect, useState, createContext, useContext } from 'react';
import { UserAuth } from './AuthContext';
import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

const TestResultsContext = createContext([]);

const TestResultsProvider = ({ children }) => {
  const [testResults, setTestResults] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    const fetchTestResults = async () => {
      if (!user) return;

      const q = query(
        collection(db, 'users', user.uid, 'testResults'),
        orderBy('timestamp', 'desc'),
        limit(10)
      );
      const querySnapshot = await getDocs(q);

      const results = [];
      querySnapshot.forEach((doc) => {
        results.push(doc.data());
      });
      setTestResults(results);
    };

    fetchTestResults();
  }, [user]);

  return (
    <TestResultsContext.Provider value={testResults}>
      {children}
    </TestResultsContext.Provider>
  );
};

const useTestResults = () => useContext(TestResultsContext);

export { TestResultsProvider, useTestResults };
