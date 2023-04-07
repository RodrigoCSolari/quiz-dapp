import useQuizToken from "./useQuizToken";
import { getSurvey } from "@/services/getSurvey";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useEffect, useState } from "react";

export type SurveyType = {
  image: string;
  questions: {
    image: string;
    lifetimeSeconds: number;
    options: {
      text: string;
    }[];
    text: string;
  }[];
  title: string;
};

export default function useSurvey() {
  const [answers, setAnswers] = useState<number[]>([]);
  const [isSurveyRunning, setIsSurveyRunning] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [surveyAvailable, setSurveyAvailable] = useState(false);
  const [remainingTime, setRemainingTime] = useState<string>();
  const [questionTimestampLimit, setQuestionTimestampLimit] = useState(0);
  const [questionSecondsLeft, setQuestionSecondsLeft] = useState(0);
  const [survey, setSurvey] = useState<SurveyType>();
  const [errorMsg, setErrorMsg] = useState("");
  const { getTimeLeft, loadingSubmit, submitSurvey } = useQuizToken();

  const addAnswer = (index: number, answer: number) => {
    if (index === answers.length) {
      setAnswers((prevAnswers) => [...prevAnswers, answer]);
    }
    if (index < answers.length) {
      setAnswers((prevAnswers) => [
        ...prevAnswers.filter((prev, i) => i !== index),
        answer,
      ]);
    }
  };

  const sendSurvey = async () => {
    if (survey && survey.questions.length === answers.length) {
      const surveyId = Math.floor(Date.now() / 1000);
      await submitSurvey(surveyId, answers);
      resetSurvey();
    }
  };

  const startSurvey = () => {
    if (survey) {
      setIsSurveyRunning(true);
    }
  };

  const resetSurvey = () => {
    setAnswers([]);
    setIsSurveyRunning(false);
    setCurrentQuestion(0);
    setSurveyAvailable(false);
    setRemainingTime(undefined);
    setQuestionTimestampLimit(0);
    setQuestionSecondsLeft(0);
    setSurvey(undefined);
    setErrorMsg("");
  };

  useEffect(() => {
    const timerRef = setTimeout(() => {
      const timeLeft = getTimeLeft();
      setRemainingTime(timeLeft);
      if (timeLeft === "00:00:00") {
        setSurveyAvailable(true);
      } else {
        setSurveyAvailable(false);
      }
    }, 1000);
    return () => {
      clearTimeout(timerRef);
    };
  }, [getTimeLeft, remainingTime]);

  useEffect(() => {
    if (surveyAvailable) {
      getSurvey()
        .then((surv) => setSurvey(surv))
        .catch((error) => {
          const errorMessage = getErrorMessage(error);
          setErrorMsg(errorMessage);
        });
    }
  }, [surveyAvailable]);

  useEffect(() => {
    if (survey && isSurveyRunning) {
      if (currentQuestion < survey.questions.length) {
        const lifetimeSeconds =
          survey.questions[currentQuestion].lifetimeSeconds;
        setQuestionSecondsLeft(lifetimeSeconds);
        setQuestionTimestampLimit(
          Math.floor(Date.now() / 1000) + lifetimeSeconds
        );
        setTimeout(() => {
          setAnswers((ans) => {
            if (ans.length === currentQuestion) {
              return [...ans, 0];
            } else {
              return ans;
            }
          });
          if (currentQuestion < survey.questions.length - 1) {
            setCurrentQuestion((ans) => ans + 1);
          } else {
            setIsSurveyRunning(false);
          }
        }, lifetimeSeconds * 1000);
      }
    }
  }, [isSurveyRunning, currentQuestion, survey]);

  useEffect(() => {
    if (questionTimestampLimit - Math.floor(Date.now() / 1000) >= 0) {
      const timerRef = setTimeout(() => {
        const secsLeft = questionTimestampLimit - Math.floor(Date.now() / 1000);
        setQuestionSecondsLeft(secsLeft);
      }, 1000);
      return () => {
        clearTimeout(timerRef);
      };
    }
  }, [questionTimestampLimit, questionSecondsLeft]);

  return {
    addAnswer,
    answers,
    currentQuestion,
    errorMsg,
    isSurveyRunning,
    loadingSubmit,
    questionSecondsLeft,
    remainingTime,
    sendSurvey,
    startSurvey,
    survey,
    surveyAvailable,
  };
}
