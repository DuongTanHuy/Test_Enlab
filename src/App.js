import { useEffect, useState } from "react";
import Quiz from "./components/Quiz";
import "./styles/App.scss";

const data = [
  {
    id: 1,
    question: "Which language runs is a web browser?",
    a: "Paris",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    id: 2,
    question:
      "Which programming language is commonly used for creating mobile applications?",
    a: "Java",
    b: "C++",
    c: "Python",
    d: "Swift",
    correct: "d",
  },
  {
    id: 3,
    question:
      "Which protocol is used for secure communication over the internet?",
    a: "HTTP",
    b: "FTP",
    c: "HTTPS",
    d: "SMTP",
    correct: "c",
  },
  {
    id: 4,
    question: "Which operating system is developed by Apple Inc.?",
    a: "Windows",
    b: "macOS",
    c: "Linux",
    d: "Android",
    correct: "b",
  },
  {
    id: 5,
    question: `What does the acronym "CPU" stand for?`,
    a: "Central Processing Unit",
    b: "Computer Processing Unit",
    c: "Control Processing Unit",
    d: "Central Power Unit",
    correct: "a",
  },
];

function App() {
  const [count, setCount] = useState(0);
  const [question, setQuestion] = useState({});
  const [change, setChange] = useState(false);
  const [result, setResult] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [start, setStart] = useState(false);

  useEffect(() => {
    setChange(true);
    setQuestion(data[count]);
    const timeChange = setTimeout(() => {
      setChange(false);
    }, 300);
    return () => {
      clearTimeout(timeChange);
    };
  }, [count]);

  return (
    <div className="relative">
      <div className="quiz-background"></div>
      <div className={`quiz-content ${change ? "active" : ""}`}>
        <div
          className={`absolute flex justify-around items-center top-0 bottom-0 left-0 right-0 ${
            start ? "backdrop-blur-0 z-0" : "backdrop-blur-lg z-20"
          } transition-all delay-300`}
        >
          <div className="flex flex-col gap-y-4 justify-around md:w-[70%] md:h-[80%] overflow-hidden">
            <div
              className={`w-40 h-40 shadow-lg rounded-full p-6 ${
                result >= 3 ? "bg-yellow-300" : "bg-green-300"
              } ${
                start && "translate-y-[900px]"
              } transition-all delay-[200ms] ease-in-out`}
            >
              <img
                src="./choose.png"
                alt="start-icon"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <p
              className={`font-bold text-4xl text-white ${
                start && "translate-y-[600px]"
              } transition-all delay-100 ease-in-out`}
            >
              Unlock Your Knowledge, Quiz Your Way!
            </p>
            <button
              onClick={() => {
                setStart(true);
                setStartTime(new Date());
              }}
              className={`w-[20%] h-[10%] bg-4xl-gradient rounded-full shadow-lg font-semibold text-white hover:scale-95 transition-all select-none mb-[10%] ease-in-out ${
                start ? "translate-y-[200px]" : ""
              }`}
            >
              Start Quiz
            </button>
          </div>
        </div>
        <div className={`${start ? "" : "hidden"}`}>
          <Quiz
            question={question}
            setCount={setCount}
            count={count}
            result={result}
            setResult={setResult}
            startTime={startTime}
            setStartTime={setStartTime}
            setStart={setStart}
          ></Quiz>
        </div>
      </div>
    </div>
  );
}

export default App;
