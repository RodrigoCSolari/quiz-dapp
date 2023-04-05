import useQuizToken from "./useQuizToken";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useState } from "react";

type Survey = {
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
  const [loadingSurvey, setLoadingSurvey] = useState(false);
  const [survey, setSurvey] = useState<Survey>();
  const [errorMsg, setErrorMsg] = useState("");
  const { loadingSubmit, submitSurvey } = useQuizToken();

  const addAnswer = (index: number, answer: number) => {
    if (survey) {
      if (index > answers.length + 1) {
        setErrorMsg(
          `awnser index should be ${answers.length + 1}. (received ${index})`
        );
        return;
      }
      if (answer > survey.questions[index].options.length || answer < 0) {
        setErrorMsg(
          `awnser option should be between 0 and ${survey.questions[index].options.length}. (received ${answer})`
        );
        return;
      }
      setAnswers((prevAnswers) => [...prevAnswers, answer]);
    }
  };

  const getSurvey = async () => {
    setLoadingSurvey(true);
    try {
      const response = await fetch("/api/surveyEndPoint");
      const data = await response.json();
      setSurvey(data);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setErrorMsg(errorMessage);
    }
    setLoadingSurvey(false);
  };

  const sendSurvey = () => {
    if (survey && survey.questions.length === answers.length) {
      const surveyId = Math.floor(Date.now() / 1000);
      submitSurvey(surveyId, answers);
    }
  };

  return {
    addAnswer,
    errorMsg,
    getSurvey,
    loadingSubmit,
    loadingSurvey,
    sendSurvey,
    survey,
  };
}
