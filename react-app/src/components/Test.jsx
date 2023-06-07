import React, { useState, useRef, useEffect } from 'react';
import { validInput } from './input';
import './test.css';

const prompt = 'sample test';

const Test = () => {
  const [input, setInput] = useState('');
  const caretRef = useRef(null);

  useEffect(() => {
    if (caretRef.current) {
      caretRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [input]);

  const handleKeyPress = (e) => {
    if (input.length >= prompt.length && e.key !== 'Backspace') return;
    if (!validInput.includes(e.key)) return;
    setInput((prevInput) => {
      if (e.key === 'Backspace') return prevInput.slice(0, -1);
      else return [...prevInput, e.key];
    });
  };

  const renderLetter = (letter, index) => {
    const currentLetter = input[index];
    const displayLetter = (currentLetter !== ' ' && currentLetter) || letter;
    const color = !currentLetter
      ? 'text-neutral-500'
      : currentLetter === letter
      ? 'text-white'
      : 'text-red-500 underline';

    return (
      <span
        key={index}
        className={`${color} whitespace-pre-wrap transition-colors ease-in-out duration-300 relative my-[.2rem]`}
        ref={index === input.length ? caretRef : null}
      >
        {index === input.length && (
          <span className={`absolute right-[.42rem] caret`}>|</span>
        )}
        {displayLetter}
      </span>
    );
  };

  return (
    <div
      className='bg-neutral-900 p-6 text-2xl flex flex-wrap outline-none'
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      {prompt.split('').map(renderLetter)}
    </div>
  );
};

export default Test;
