"use client"

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { doQuizFunction } from "@/app/actions";

export default function QuizPage(props: { quiz: {question: string, answer: string, category: String, options: [{Option: string, Count: number}],}, loggedIn: boolean, done: boolean }) {
  const loggedIn = props.loggedIn;
  const [done, setDone] = useState(props.done);
  const quiz = props.quiz;
  const [msg, setMsg] = useState("");

  async function doQuizButton(answer: string){
    if (loggedIn == false){
        setMsg("You are not logged in! Log in first")
    } else {
        const func = await doQuizFunction(answer)
        if (func == true){
            setDone(true)
            setMsg("Answer submitted! Check dashboard to see if you got it right or not!")
        } else {
            setMsg(func)
        }
    }
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">Today&apos;s Quiz</h1>
      </div>
      <p>{msg}</p>
      {done ? 
        <div>
          <p>You&apos;ve done today&apos;s quiz!</p>
        </div>
      :
        <div>
          <h3 className="font-bold text-xl">{quiz.question}</h3>
          <p>Category: {quiz.category}</p>
          <p>Options:</p>
          <div className="flex gap-4">
            {quiz.options.map((option) => (
              <Button onClick={() => {doQuizButton(option.Option)}} key={option.Option}>{option.Option}</Button>
            ))}
          </div>
        </div>
    
      }
    </section>
  );
}