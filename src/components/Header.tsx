import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="h-16 bg-purple-400 flex justify-between items-center px-12 text-white">
      <Link href="/" className="w-full text-3xl font-bold">
        Quiz App
      </Link>
      <div className="flex justify-evenly w-full text-lg font-semibold">
        <Link href="/">Home</Link>
        <Link href="/question">Question</Link>
        <Link href="/state">State</Link>
        <Link href="/quiz">Quiz</Link>
      </div>
    </header>
  );
}
