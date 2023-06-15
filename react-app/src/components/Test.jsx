import React, { useState, useEffect } from 'react';
import { validInput } from './input';
import { generate } from 'random-words';
import './test.css';

const Test = () => {
  const [numWords, setNumWords] = useState(25); // Test length
  const [words, setWords] = useState(generate(numWords)); // Words for user to type
  const [isFocused, setIsFocused] = useState(false); // Whether input is focused
  const [hasEnded, setHasEnded] = useState(true); // Whether test has ended
  const [timer, setTimer] = useState(0); // Timer
  const [currentInput, setCurrentInput] = useState(''); // Current word user is typing
  const [input, setInput] = useState([]); // Previously typed words
  const [prevCorrect, setPrevCorrect] = useState(true); // Whether previous word was typed correctly
  const [correct, setCorrect] = useState([]); // Words user has typed correctly
  const [wpm, setWpm] = useState(0); // Words per minute
  const [numTyped, setNumTyped] = useState(0); // Number of times user has typed a letter
  const [numTypedCorrect, setNumTypedCorrect] = useState(0); // Number of times user has typed a letter correctly
  const [accuracy, setAccuracy] = useState(100); // Accuracy

  // Initialize test
  function init(_numWords) {
    setNumWords(_numWords);
    setWords(generate(_numWords));
    setCurrentInput('');
    setInput([]);
    setPrevCorrect(true);
    setCorrect([]);
    setHasEnded(true);
    setWpm(0);
    setNumTyped(0);
    setNumTypedCorrect(0);
    setAccuracy(100);
    setTimer(0);
  }

  // Set focus of test
  function handleFocus() {
    setIsFocused((prev) => !prev);
  }

  // Start test
  function start() {
    setHasEnded(false);
  }

  // End Test
  function end() {
    setHasEnded(true);
  }

  // Log metrics at end of test
  useEffect(() => {
    if (hasEnded && timer && wpm)
      console.log(`Time: ${timer}\nWPM: ${wpm}\nAccuracy: ${accuracy}`);
  }, [wpm, timer, accuracy]);

  // Manage timer
  useEffect(() => {
    let interval;
    if (!hasEnded) {
      interval = setInterval(() => {
        setTimer((prev) => {
          const time = (prev += 0.01);
          return parseFloat(time.toFixed(2));
        });
      }, 10);
    }
    return () => clearInterval(interval);
  }, [hasEnded]);

  // Store correctly typed words
  function updateCorrect() {
    setCorrect(() => {
      return input.filter((word, index) => word === words[index]);
    });
  }

  // On change of input
  useEffect(() => {
    updateCorrect();
    if (input.length === words.length) end();
  }, [input]);

  // Calculates WPM
  function calcWPM() {
    const numChars = correct.join().length;
    const _wpm = numChars / 5 / (timer / 60);
    if (correct.length) setWpm(parseFloat(_wpm.toFixed(2)));
  }

  // On change of correct
  useEffect(() => {
    calcWPM();
  }, [correct]);

  // Calculate accuracy
  function calcAccuracy() {
    const _accuracy = (numTypedCorrect / numTyped) * 100;
    if (!hasEnded) setAccuracy(parseFloat(_accuracy.toFixed(2)));
  }

  // On change of current input
  useEffect(() => {
    calcAccuracy();
  }, [currentInput]);

  // Handle user input
  function handleKeyDown(e) {
    if (!validInput.includes(e.key)) return;

    // Start condition
    if (
      !input.length &&
      !currentInput.length &&
      e.key !== 'Backspace' &&
      e.key !== ' '
    )
      start();

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
      else if (input.length && !prevCorrect && !hasEnded) {
        setCurrentInput(input.pop());
        setPrevCorrect(true);
      }
    }

    // Update input
    else if (currentInput.length < 15) {
      setNumTyped((prev) => prev + 1);
      if (!hasEnded && words[input.length][currentInput.length] === e.key)
        setNumTypedCorrect((prev) => prev + 1);
      setCurrentInput((prev) => prev + e.key);
    }
  }

  // Render words to screen
  function renderWords(word, wIdx) {
    return (
      <span key={wIdx} className='mx-1 my-[2px]'>
        {word.split('').map((letter, lIdx) => {
          let color = 'text-neutral-500';
          let rest;

          // style previous words
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

          // style current word
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
              className={`${color} transition-colors ease-in-out duration-200 relative`}
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

  // Render caret
  function renderCaret(word, wIdx, lIdx) {
    if (
      isFocused &&
      wIdx === input.length &&
      (lIdx === currentInput.length ||
        (lIdx === word.length - 1 && currentInput.length >= word.length))
    ) {
      const pos =
        currentInput.length < word.length
          ? 'right-[.42rem]'
          : 'right-[-.42rem]';
      return <span className={`caret absolute top-[-.1rem] ${pos}`}>|</span>;
    }
    return;
  }

  return (
    // Container
    <div className='flex flex-col items-between w-2/3'>
      {/* Dashboard */}
      <div className='flex justify-between p-6'>
        {/* Metrics */}
        <div className='flex flex-col text-2xl font-medium mx-1 w-1/3'>
          <h1 className='mr-5'>
            Time: {hasEnded ? '--' : timer.toFixed(2) + ' sec'}
          </h1>
          <h1 className='mr-5'>WPM: {hasEnded ? '--' : wpm.toFixed(2)}</h1>
          <h1 className='mr-5'>
            Accuracy: {hasEnded ? '--' : accuracy.toFixed(2) + '%'}
          </h1>
        </div>

        {/* Buttons */}
        <div className='flex justify-center items-center text-xl text-black font-semibold'>
          <button
            className='mx-2 bg-neutral-100 py-2 px-5 rounded-md'
            onClick={() => init(25)}
          >
            25
          </button>
          <button
            className='mx-2 bg-neutral-100 py-2 px-5 rounded-md'
            onClick={() => init(50)}
          >
            50
          </button>
          <button
            className='mx-2 bg-neutral-100 py-2 px-5 rounded-md'
            onClick={() => init(100)}
          >
            100
          </button>
          <button
            className='mx-2 bg-neutral-100 py-2 px-5 rounded-md'
            onClick={() => init(numWords)}
          >
            Reset
          </button>
        </div>
        <div className='w-1/3' />
      </div>

      {/* Test */}
      <div className='p-6 text-2xl flex flex-wrap outline-none relative items-center'>
        <div
          className='absolute inset-1 z-10 flex justify-center items-center outline-none backdrop-blur-md focus:backdrop-blur-none transition ease-in-out duration-300 overflow-hidden'
          onKeyDown={handleKeyDown}
          tabIndex={0}
          onFocus={handleFocus}
          onBlur={handleFocus}
        >
          <span
            className={`${
              isFocused && 'opacity-0'
            } transition-opacity ease-in-out duration-300 text-white`}
          >
            Click to start typing!
          </span>
        </div>
        {words.map(renderWords)}
      </div>
    </div>
  );
};

export default Test;
