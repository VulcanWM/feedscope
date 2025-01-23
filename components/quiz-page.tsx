"use client"

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { doQuizFunction } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";

export default function QuizPage(props: { 
  quiz: {
    question: string, 
    answer: string, 
    category: string, 
    options: { Option: string, Count: number }[],
  }, 
  loggedIn: boolean, 
  done: boolean 
}) {
  const loggedIn = props.loggedIn;
  const [done, setDone] = useState(props.done);
  const quiz = props.quiz;
  const [msg, setMsg] = useState("");

  async function doQuizButton(answer: string) {
    if (!loggedIn) {
      setMsg("You are not logged in! Log in first");
    } else {
      const func = await doQuizFunction(answer);
      if (func === true) {
        setDone(true);
        setMsg("Answer submitted! Check dashboard to see if you got it right or not!");
      } else {
        setMsg(func);
      }
    }
  }

  function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    setMsg("Link copied! Share it with your friends!");
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Today&apos;s Quiz
        </h1>
      </div>
      <p className="text-blue-600">{msg}</p>
      {done ? (
        <div className="mt-4">
          <p className="text-lg font-medium">You&apos;ve done today&apos;s quiz!</p><br/>
          <Card>
            <CardHeader>
              <CardTitle>Can your friends do better?</CardTitle>
              <CardDescription>Compete with your friends in the leaderboard</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 flex-wrap">
                <Button onClick={copyLink}>
                  Copy Quiz Link
                </Button>
                <Link href="/leaderboard" className={buttonVariants({ variant: "outline" })}>
                  View Leaderboard
                </Link>
              </div>
            </CardContent>
          </Card>

        </div>
      ) : (
        <div>
          <h3 className="font-bold text-xl">{quiz.question}</h3>
          <p className="text-muted-foreground">Category: {quiz.category}</p>
          <p className="mt-2">Options:</p>
          <div className="flex gap-4 flex-wrap mt-2">
            {quiz.options.map((option) => (
              <Button 
                onClick={() => doQuizButton(option.Option)} 
                key={option.Option}>
                {option.Option}
              </Button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}