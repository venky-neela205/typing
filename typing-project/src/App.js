import { useEffect, useState } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import "./App.css";

const App = () => {
  const [count, setCount] = useState(300);
  const [keys, setKeys] = useState("");
  const [input, setInput] = useState("");
  const [startTyping, setStartTyping] = useState(true);
  const [timer, setTimer] = useState(null);
  const [result, setResult] = useState(false);
  const [keyCount, setKeyCount] = useState(0);
  const [correctKeyCount, setCorrectKeyCount] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  const generateNextKeys = () => {
    const keys = "asdfjkl;";
    let nextKeys = "";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * keys.length);
      nextKeys += keys[randomIndex];
    }
    setKeys(nextKeys);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const onHandleGenerateText = () => {
    generateNextKeys();
    if (!timer) {
      setTimer(
        setInterval(() => {
          setCount((count) => count - 1);
        }, 1000)
      );
    }
  };

  const onHandleUserInput = (e) => {
    setInput(e.target.value);
    setKeyCount(keyCount + 1);
    calculateAccuracy();
    if (e.target.value === keys) {
      generateNextKeys();
      setInput("");
    }
  };

  const calculateAccuracy = () => {
    const correctChars = keys.split("");
    const typedChars = input.split("");
    let correctCount = 0;

    typedChars.forEach((char, index) => {
      if (char === correctChars[index]) {
        correctCount++;
      }
    });

    setCorrectKeyCount(correctCount);
    console.log(correctKeyCount);

    const acc = (correctKeyCount / keyCount) * 100;
    setAccuracy(acc.toFixed(2));
  };

  useEffect(() => {
    if (count === 0) {
      clearInterval(timer);
      setTimer(null);
      setResult(true);
      setStartTyping(true);
      setCount(10);
      setKeys("");
      setInput("");
      setTimer(null);
    }
  }, [count, timer]);
  const onHandleStartTyping = () => {
    setStartTyping(false);
    setResult(false);
    setKeyCount(0);
    setCorrectKeyCount(0);
    setAccuracy(0);
  };

  return (
    <div>
      {startTyping ? (
        <div className="start-page-container">
          <div className="start-page-heading-img">
            <div>
              <h1 className="start-page-heading">Touch Typing</h1>
              <div className="paras">
                <h3>Posture and Positioning:</h3>
                <ul>
                  <li>
                    Sit up straight with your back against the chair's backrest.
                  </li>
                  <li>
                    Place your feet flat on the ground, shoulder-width apart.
                  </li>
                  <li>
                    Keep your arms and elbows relaxed at a 90-degree angle.
                  </li>
                </ul>
                <h3>Hand and Finger Placement:</h3>
                <ul>
                  <li>
                    Rest your hands on the keyboard, fingers on the home row
                    keys.
                  </li>
                  <li>
                    Left hand: pinky on "A," ring finger on "S," middle finger
                    on "D," index finger on "F."
                  </li>
                  <li>
                    Right hand: index finger on "J," middle finger on "K," ring
                    finger on "L," pinky on ";".
                  </li>
                </ul>
                <h3>Touch Typing Technique:</h3>
                <ul>
                  <li>
                    Type without looking at the keyboard, maintaining focus on
                    the screen.
                  </li>
                  <li>
                    Practice typing each key with the corresponding finger.
                  </li>
                  <li>Aim for a smooth and consistent typing flow.</li>
                </ul>
              </div>
            </div>
            <img
              className="typing-test-img"
              src="https://res.cloudinary.com/dne55va8l/image/upload/v1684919823/typing-test-for-beginners_qhbc9s.png"
              alt="typing-instructions"
            />
          </div>
          <div>
            <button
              className="button"
              type="button"
              onClick={onHandleStartTyping}
            >
              Lets Begin!
            </button>
          </div>
        </div>
      ) : (
        <div className="main-page-container">
          <h1 className="start-page-heading">Touch Typing</h1>
          <div className="timer-count">
            <AiFillClockCircle className="timer-img" />
            <p className="timer">{formatTime(count)}</p>
          </div>
          <div className="main-page-text-container">
            <h1 className="main-page-text">{keys}</h1>
          </div>

          <input
            className="main-page-input"
            onChange={onHandleUserInput}
            value={input}
            placeholder="start typing here..."
          />
          <p>
            After clicking the 'Generate' button,the keys will be displayed one
            after the other and the countdown will initiate.
          </p>
          <button
            className="button"
            type="button"
            onClick={onHandleGenerateText}
          >
            Generate
          </button>
        </div>
      )}
      {result && (
        <div>
          <p className="result">Your Result</p>
          <div className="result-page-container">
            <h1>No. of Keys Pressed : {keyCount}</h1>
            <h1>No. of Correct Keys Pressed : {correctKeyCount}</h1>
            <h1>Accuracy: {accuracy}%</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
