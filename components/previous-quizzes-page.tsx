"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function PreviousQuizzesPage(props: {
  previousQuizzes: {
    options: { Option: string; Count: number }[];
    answer: string;
    question: string;
    category: string;
    date: Date;
  }[];
  points?: number;
}) {
  const { previousQuizzes } = props;

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Previous Quizzes
        </h1>
      </div>
      {previousQuizzes.length == 0 && <p>Today is the first day of quizzes!</p>}
      <div className="w-full flex flex-col gap-6">
        {previousQuizzes.map((quiz, index) => {
          const totalVotes = quiz.options.reduce(
            (acc, curr) => acc + curr.Count,
            0
          );

          const chartData = quiz.options.map((opt, i) => ({
            name: opt.Option,
            value: opt.Count,
            fill: `hsl(var(--chart-${i + 1}))`,
          }));

          const chartConfig: ChartConfig = quiz.options.reduce<Record<string, { label: string; color: string }>>(
            (config, opt, i) => {
              config[opt.Option] = {
                label: opt.Option,
                color: `hsl(var(--chart-${i + 1}))`,
              };
              return config;
            },
            {}
          );          

          return (
            <Card key={index} className="flex flex-col">
              <CardHeader className="items-center pb-0">
                <CardTitle>{quiz.question}</CardTitle>
                <CardDescription>
                  Category: {quiz.category} | Date:{" "}
                  {new Date(quiz.date).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-0">
                <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      strokeWidth={5}
                    >
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className="fill-foreground text-3xl font-bold"
                                >
                                  {totalVotes.toLocaleString()}
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 24}
                                  className="fill-muted-foreground"
                                >
                                  Votes
                                </tspan>
                              </text>
                            );
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Correct Answer:{" "}
                  <span className="font-bold text-green-600">{quiz.answer}</span>
                </div>
                <div className="leading-none text-muted-foreground">
                  Total options: {quiz.options.length}
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
