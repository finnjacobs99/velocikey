import React, { useState } from 'react';

const quote = `this is a sentence used for testing purposes this is a sentence used for testing purposes this is a sentence used for testing purposes this is a sentence used for testing purposes this is a sentence used for testing purposes this is a sentence used for testing purposes this is a sentence used for testing purposes this is a sentence used for testing purposes this is a sentence used for testing purposes this is a sentence used for testing purposes this is a sentence used for testing purposes`;

const Input = () => {
  const [input, setInput] = useState([]);

  // Handle input from keyboard
  const handleKeyPress = (e) => {
    if (!letters.includes(e.key)) return;
    setInput((prevInput) => {
      if (e.key === 'Backspace') return prevInput.slice(0, -1);
      else return [...prevInput, e.key];
    });
  };

  // Render letters
  const renderLetter = (letter, index) => {
    const isSpace = letter === ' ';
    const isMatch = input[index] === letter;
    const color = isMatch ? 'text-white' : 'text-red-500 underline';
    const isTyped = !input[index] ? 'text-neutral-500' : color;

    return (
      <span
        key={index}
        className={`${isTyped} ${
          isSpace ? 'mr-1' : ''
        } transition-colors ease-in-out duration-300`}
      >
        {letter}
      </span>
    );
  };

  return (
    <div
      className='bg-neutral-900 p-6 text-xl flex flex-wrap outline-none w-2/3'
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      {quote.split('').map(renderLetter)}
    </div>
  );
};

export default Input;
