import React, { useState, useEffect } from 'react';
import { validInput } from './input';
import { generate } from 'random-words';
import './test.css';

const NUM_WORDS = 200;
const SECONDS = 60;

const words = generate(25);

const Test = () => {
  const [timer, setTimer] = useState(SECONDS);
  const [isFocused, setIsFocused] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  const [input, setInput] = useState([]);
  const [prevCorrect, setPrevCorrect] = useState(true);

  // Start timer
  function start() {
    let interval = setInterval(() => {
      setTimer((prev) => {
        if (!prev) clearInterval(interval);
        else return prev - 1;
      });
    }, 1000);
  }

  function handleFocus() {
    setIsFocused((prev) => !prev);
  }

  // Handle user input
  function handleKeyDown(e) {
    if (!validInput.includes(e.key)) return;

    // Move onto next word
    if (e.key === ' ') {
      if (currentInput.length && input.length < words.length) {
        setInput((prev) => {
          const newInput = [...prev, currentInput];
          setPrevCorrect(
            newInput[newInput.length - 1] === words[newInput.length - 1]
          );
          return newInput;
        });
        setCurrentInput('');
      }
    }

    // Handle backspaces
    else if (e.key === 'Backspace') {
      if (currentInput.length) setCurrentInput((prev) => prev.slice(0, -1));
      else if (input.length && !prevCorrect) {
        setCurrentInput(input.pop());
        setPrevCorrect(true);
      }
    }

    // Update input
    else if (currentInput.length < 15) setCurrentInput((prev) => prev + e.key);
  }

  // Render words to screen
  function renderWords(word, wIdx) {
    return (
      <span key={wIdx} className='mx-1'>
        {word.split('').map((letter, lIdx) => {
          let color = 'text-neutral-500';
          let rest;

          // set text colors previous words
          if (wIdx < input.length) {
            // correct/incorrect
            if (input[wIdx][lIdx] === letter) color = 'text-white';
            else {
              color = 'text-red-500 underline';
              if (input[wIdx][lIdx] !== undefined) letter = input[wIdx][lIdx];
            }

            // extra input
            if (input[wIdx].length > word.length && lIdx === word.length - 1) {
              rest = (
                <span className='text-red-500 underline'>
                  {input[wIdx].substring(word.length, input[wIdx.lenght])}
                </span>
              );
            }
          }

          // set text colors for current word
          else if (wIdx === input.length) {
            // correct/incorrect
            if (lIdx < currentInput.length) {
              if (currentInput[lIdx] === letter) color = 'text-white';
              else {
                color = 'text-red-500 underline';
                letter = currentInput[lIdx];
              }
            }

            // extra input
            if (currentInput.length > word.length && lIdx === word.length - 1) {
              rest = (
                <span className='text-red-500 underline'>
                  {currentInput.substring(word.length, currentInput.length)}
                </span>
              );
            }
          }

          // Render words
          return (
            <span
              key={lIdx}
              className={`${color} transition-colors ease-in-out duration-300 relative`}
            >
              {renderCaret(word, wIdx, lIdx)}
              {letter}
              {rest !== undefined && rest}
            </span>
          );
        })}
      </span>
    );
  }

  // Renders caret
  function renderCaret(word, wIdx, lIdx) {
    if (
      isFocused &&
      wIdx === input.length &&
      (lIdx === currentInput.length ||
        (lIdx === word.length - 1 && currentInput.length >= word.length))
    ) {
      const leftBound = currentInput.length < word.length ? '' : '-';
      return (
        <span
          className={`caret absolute top-[-.1rem] right-[${leftBound}.42rem]`}
        >
          |
        </span>
      );
    }
    return;
  }

  return (
    <div className='flex flex-col items-start w-2/3'>
      <h1>{timer}</h1>
      <button onClick={start}>Start</button>
      <div className='bg-neutral-900 p-6 text-2xl flex flex-wrap outline-none relative'>
        <div
          className='absolute inset-1 z-10 flex justify-center items-center outline-none backdrop-blur-md focus:backdrop-blur-none transition ease-in-out duration-300 overflow-hidden'
          onKeyDown={handleKeyDown}
          tabIndex={0}
          onFocus={handleFocus}
          onBlur={handleFocus}
        >
          <span className={`${isFocused && 'opacity-0'} text-neutral-300`}>
            Click to start
          </span>
        </div>
        {words.map(renderWords)}
      </div>
    </div>
  );
};

export default Test;
