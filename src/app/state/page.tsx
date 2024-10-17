"use client";

import React, { useState } from "react";

type MathQuestion = {
  id: number;
  questionText: string;
  options: number[];
  correctAnswer: number;
};

type AlphabetQuestion = {
  id: number;
  questionText: string;
  options: string[];
  correctAnswer: string;
};

const mathQuestions: MathQuestion[] = [
  {
    id: 1,
    questionText: "8 + 2 = ?",
    options: [7, 8, 9, 10],
    correctAnswer: 10,
  },
  {
    id: 2,
    questionText: "3 + 4 = ?",
    options: [5, 6, 7, 8],
    correctAnswer: 7,
  },
];

const alphabetQuestions: AlphabetQuestion[] = [
  {
    id: 1,
    questionText: "abc 다음은?",
    options: ["a", "b", "d", "e"],
    correctAnswer: "d",
  },
  {
    id: 2,
    questionText: "abcd 다음은?",
    options: ["f", "b", "e", "g"],
    correctAnswer: "e",
  },
];

export default function State() {
  const [quizType, setQuizType] = useState<string>("math");
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string | number | null;
  }>({});
  const [submitted, setSubmitted] = useState<{ [key: number]: boolean }>({});
  const [correctness, setCorrectness] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleAnswerSelect = (questionId: number, option: string | number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
    setSubmitted((prev) => ({ ...prev, [questionId]: false }));
    setCorrectness((prev) => ({ ...prev, [questionId]: false }));
  };

  const handleSubmit = (questionId: number) => {
    const currentQuestions =
      quizType === "math" ? mathQuestions : alphabetQuestions;
    const isCorrect =
      selectedAnswers[questionId] ===
      currentQuestions.find((q) => q.id === questionId)?.correctAnswer;
    setCorrectness((prev) => ({ ...prev, [questionId]: isCorrect }));
    setSubmitted((prev) => ({ ...prev, [questionId]: true }));
  };

  const questions = quizType === "math" ? mathQuestions : alphabetQuestions;

  return (
    <div className="flex items-center justify-around gap-6 p-36">
      <div>
        <select
          id="quizType"
          value={quizType}
          onChange={(e) => setQuizType(e.target.value)}
          className="px-4 py-2 border rounded-md outline-none"
        >
          <option value="math">Math</option>
          <option value="alphabet">Alphabet</option>
        </select>
      </div>

      {questions.map((question) => (
        <div
          key={question.id}
          className={`p-6 border-2 rounded-lg w-full max-w-md transition-colors 
              ${
                submitted[question.id]
                  ? correctness[question.id]
                    ? "border-green-500"
                    : "border-red-500"
                  : "border-gray-300"
              }`}
        >
          <h2 className="text-lg font-bold mb-4">{question.questionText}</h2>
          <div className="flex flex-col gap-2">
            {question.options.map((option) => (
              <label key={option} className="flex items-center gap-2">
                {submitted[question.id] &&
                  option === question.correctAnswer && (
                    <span className="ml-2">✅</span>
                  )}
                {submitted[question.id] &&
                  option !== question.correctAnswer && (
                    <span className="ml-2">❌</span>
                  )}
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={selectedAnswers[question.id] === option}
                  onChange={() => handleAnswerSelect(question.id, option)}
                  disabled={submitted[question.id]} // Disable after submission
                  className="radio"
                />
                {option}
              </label>
            ))}
          </div>

          {!submitted[question.id] &&
            selectedAnswers[question.id] !== undefined &&
            selectedAnswers[question.id] !== null && (
              <button
                onClick={() => handleSubmit(question.id)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                답변 확인
              </button>
            )}
        </div>
      ))}
    </div>
  );
}
