"use client";

import { generateQuiz } from "@/actions/interview";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useFetch from "@/hooks/use-fetch";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BarLoader } from "react-spinners";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  useEffect(() => {
    if(quizData) {
        setAnswers(new Array(quizData.length).fill(null));
    }
  }, [quizData])

  if (generatingQuiz) {
    return <BarLoader className="mt-4" width={"100%"} color="gray" />;
  }

  if (!quizData) {
    return (
      <Card className="mx-2">
        <CardHeader>
          <CardTitle>Ready to test your knowledge?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This quiz contains 10 questions specific to your industry and
            skills. Take your time and choose the best answer for each question.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={generateQuizFn} className="w-full cursor-pointer">
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return <div>Quiz</div>;
};

export default Quiz;
