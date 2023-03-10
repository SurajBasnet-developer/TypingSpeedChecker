import React, { useEffect, useRef, useState } from "react";

const sentences = [
  "The quick brown fox jumpes over the lazy dog",
  "How vexingly quick daft zebras jump!",
  "Jackdaws love my big sphinx of quartz.",
  "Sphinx of black quartz, judge my vow",
  "The five boxing wizards jump quickly",
];
const Typingtest = () => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const inputref = useRef(null);

  const currentSentence = sentences[currentSentenceIndex];
  useEffect(() => {
    if (isStarted) {
      const intervalid = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
      return () => clearInterval(intervalid);
    }
  }, [isStarted]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (!isStarted) {
      setIsStarted(true);
    }
    if (e.target.value === currentSentence) {
      setCurrentSentenceIndex((index) => index + 1);
      setInputValue("");
    }
  };

  const handleRestart = () => {
    setCurrentSentenceIndex(0);
    setInputValue("");
    setSeconds(0);
    setIsStarted(false);
    inputref.current.focus();
  };

  return (
    <div>
      <h2>Typing Speed Test</h2>
      <div>{currentSentence}</div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        ref={inputref}
        disabled={currentSentenceIndex === sentences.length}
      />
      <div>
        {currentSentenceIndex === sentences.length ? (
          <div>
            <p>Time taken: {seconds}</p>
            <p>
              Typing speed:{" "}
              {((sentences.join("").length / seconds) * 60).toFixed(0)}WPM
            </p>
            <button onClick={handleRestart}>Restart</button>
          </div>
        ) : (
          <p>{sentences.length - currentSentenceIndex} sentences remaining </p>
        )}
      </div>
    </div>
  );
};

export default Typingtest;
