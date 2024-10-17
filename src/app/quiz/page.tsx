"use client";

import React, { useState } from "react";

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

const mathQuestions: Question[] = [
  { question: "3 + 2 = ?", options: ["4", "5", "6", "7"], correctAnswer: "5" },
  { question: "7 + 1 = ?", options: ["6", "7", "8", "9"], correctAnswer: "8" },
  {
    question: "5 + 6 = ?",
    options: ["7", "8", "10", "11"],
    correctAnswer: "11",
  },
  {
    question: "4 + 9 = ?",
    options: ["6", "8", "10", "13"],
    correctAnswer: "13",
  },
];

const alphabetQuestions: Question[] = [
  {
    question: "abc 다음은?",
    options: ["d", "e", "f", "g"],
    correctAnswer: "d",
  },
  {
    question: "abcd 다음은?",
    options: ["e", "f", "g", "h"],
    correctAnswer: "e",
  },
  { question: "ab 다음은?", options: ["c", "d", "e", "f"], correctAnswer: "c" },
  {
    question: "abcde 다음은?",
    options: ["f", "g", "h", "i"],
    correctAnswer: "f",
  },
];

export default function Quiz() {
  const [selectedCategory, setSelectedCategory] = useState<string>("math");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);

  const questions =
    selectedCategory === "math" ? mathQuestions : alphabetQuestions;
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setIsAnswerSubmitted(true);
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null); // Reset for next question
    setIsAnswerSubmitted(false);
  };

  const handleQuizStart = () => {
    setQuizStarted(true);
  };

  const handleQuizFinish = () => {
    setShowResult(true);
  };

  const handleRestart = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setShowResult(false);
    setQuizStarted(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 pt-20">
      <h1 className="text-4xl font-bold mb-6">Test</h1>

      {!quizStarted && !showResult && (
        <div className="w-full max-w-md p-4 border border-gray-300 rounded-lg shadow-lg">
          <select
            value={selectedCategory || "Math"}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-400 rounded outline-none"
          >
            <option value="math">Math</option>
            <option value="alphabet">Alphabet</option>
          </select>
          <button
            onClick={handleQuizStart}
            className="w-full bg-purple-400 text-white py-2 px-4 rounded hover:bg-purple-500"
          >
            연습 테스트 시작
          </button>
        </div>
      )}

      {quizStarted && !showResult && (
        <div className="w-full max-w-md p-4 border border-gray-300 rounded-lg shadow-lg bg-purple-100">
          <h2 className="text-xl font-semibold mb-4">
            {currentQuestion.question}
          </h2>
          {currentQuestion.options.map((option) => (
            <label
              key={option}
              className={`block p-2 border rounded-xl mb-2 bg-white ${
                selectedAnswer === option ? "bg-blue-200" : ""
              }`}
            >
              <input
                type="radio"
                name="answer"
                value={option}
                checked={selectedAnswer === option}
                onChange={() => handleAnswerSelect(option)}
                disabled={isAnswerSubmitted}
                className="mr-2"
              />
              {option}
            </label>
          ))}

          {isAnswerSubmitted && currentQuestionIndex < totalQuestions - 1 && (
            <button
              onClick={handleNextQuestion}
              className="w-full bg-purple-400 text-white py-2 px-4 rounded hover:bg-purple-500 mt-4"
            >
              다음
            </button>
          )}

          {isAnswerSubmitted && currentQuestionIndex === totalQuestions - 1 && (
            <button
              onClick={handleQuizFinish}
              className="w-full bg-purple-400 text-white py-2 px-4 rounded hover:bg-purple-500 mt-4"
            >
              제출
            </button>
          )}

          <p className="mt-4 text-sm font-bold">
            문제 {currentQuestionIndex + 1} / {totalQuestions}
          </p>
        </div>
      )}

      {showResult && (
        <div className="w-full max-w-md p-4 border border-gray-300 rounded-lg shadow-lg">
          <p className="text-2xl font-bold mb-4">결과</p>
          <p className={"mb-4 font-semibold text-sm"}>
            {`${totalQuestions}점 중 `}
            <span
              className={`${
                score === totalQuestions ? "text-green-500" : "text-red-500"
              }`}
            >
              {score}
            </span>
            점을 획득했습니다.
          </p>
          <h2 className="font-semibold mb-4 text-sm">
            {score === totalQuestions
              ? "시험에 합격했습니다."
              : "시험에 합격하지 못했습니다."}
          </h2>
          <button
            onClick={handleRestart}
            className="w-full bg-purple-400 text-white py-2 px-4 rounded hover:bg-purple-500"
          >
            새로운 연습 테스트 시작
          </button>
        </div>
      )}
    </div>
  );
}
