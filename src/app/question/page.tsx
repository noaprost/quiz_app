"use client";
import React, { useState } from "react";

type Question = {
  id: number;
  questionText: string;
  options: number[];
  correctAnswer: number;
};

const questions: Question[] = [
  {
    id: 1,
    questionText: "5 + 3 = ?",
    options: [6, 7, 8, 9],
    correctAnswer: 8,
  },
  {
    id: 2,
    questionText: "2 + 4 = ?",
    options: [5, 6, 7, 8],
    correctAnswer: 6,
  },
];

export default function Question() {
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number | null;
  }>({});
  const [submitted, setSubmitted] = useState<{ [key: number]: boolean }>({});
  const [correctness, setCorrectness] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleAnswerSelect = (questionId: number, option: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
    setSubmitted((prev) => ({ ...prev, [questionId]: false }));
    setCorrectness((prev) => ({ ...prev, [questionId]: false }));
  };

  const handleSubmit = (questionId: number) => {
    const isCorrect =
      selectedAnswers[questionId] ===
      questions.find((q) => q.id === questionId)?.correctAnswer;
    setCorrectness((prev) => ({ ...prev, [questionId]: isCorrect }));
    setSubmitted((prev) => ({ ...prev, [questionId]: true }));
  };

  return (
    <div className="flex items-center gap-6 py-36 px-72">
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
                  disabled={submitted[question.id]}
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
