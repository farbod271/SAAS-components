import React, { useState, useEffect, useRef } from 'react';

const TypingTest = () => {
  // Sample sentences to type
  const sentences = [
    "The quick brown fox jumps over the lazy dog",
    "Programming is an art of telling another human what one wants the computer to do",
    "React makes it painless to create interactive user interfaces"
  ];

  // State management
  const [currentSentence, setCurrentSentence] = useState('');
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [letterStatuses, setLetterStatuses] = useState<('correct' | 'incorrect' | 'pending')[]>([]);
  const [isTestComplete, setIsTestComplete] = useState(false);

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize test
  const startTest = () => {
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
    setCurrentSentence(randomSentence);
    setCurrentLetterIndex(0);
    setLetterStatuses(new Array(randomSentence.length).fill('pending'));
    setIsTestComplete(false);
    
    // Ensure input is focused and cleared
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  // Handle key up event
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent default to stop unwanted behavior
    e.preventDefault();

    // If test is complete, don't process further
    if (isTestComplete) return;

    // Get the current input value
    const inputValue = inputRef.current?.value || '';
    console.log('Input value:', inputValue);
    console.log('Current letter index:', currentLetterIndex);
    console.log('Current sentence:', currentSentence);

    // Check if input matches the expected sequence of letters
    if (inputValue.length > currentLetterIndex) {
      const newStatuses = [...letterStatuses];
      
      // Check the most recently typed letter
      const typedLetter = inputValue[currentLetterIndex];
      const expectedLetter = currentSentence[currentLetterIndex];

      console.log('Typed letter:', typedLetter);
      console.log('Expected letter:', expectedLetter);

      // Update letter status
      if (typedLetter === expectedLetter) {
        newStatuses[currentLetterIndex] = 'correct';
      } else {
        newStatuses[currentLetterIndex] = 'incorrect';
      }

      // Move to next letter
      const nextIndex = currentLetterIndex + 1;
      setCurrentLetterIndex(nextIndex);
      setLetterStatuses(newStatuses);

      // Check if test is complete
      if (nextIndex === currentSentence.length) {
        setIsTestComplete(true);
      }
    }
  };

  // Reset test on component mount
  useEffect(() => {
    startTest();
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Letter Accuracy Test</h1>

      {/* Sentence Display */}
      <div className="mb-4 text-xl flex flex-wrap justify-center">
        {currentSentence.split('').map((letter, index) => (
          <span
            key={index}
            className={`
              mx-[1px] 
              ${index < currentLetterIndex 
                ? (letterStatuses[index] === 'correct' 
                    ? 'text-green-500' 
                    : 'text-red-500')
                : index === currentLetterIndex 
                  ? 'border-b-2 border-blue-500' 
                  : 'text-gray-300'
              }
            `}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Current Letter Indicator */}
      {!isTestComplete && (
        <div className="mb-4 text-xl">
          Next Letter: <span className="font-bold">{currentSentence[currentLetterIndex]}</span>
        </div>
      )}

      {/* Input Field */}
      <input
        ref={inputRef}
        type="text"
        onKeyUp={handleKeyUp}
        className="w-full p-2 border rounded"
        placeholder="Start typing..."
        autoFocus
      />

      {/* Test Complete Message */}
      {isTestComplete && (
        <div>
          <button 
            onClick={startTest}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Accuracy Summary */}
      {isTestComplete && (
        <div className="mt-4">
          <p>Accuracy: {" "}
            {(letterStatuses.filter(status => status === 'correct').length / currentSentence.length * 100).toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
};

export default TypingTest;