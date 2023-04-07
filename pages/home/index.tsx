import CountDown from "@/components/CountDown";
import Spinner from "@/components/Spinner";
import Survey from "@/components/Survey";
import useSurvey from "@/hooks/useSurvey";
import useWallet from "@/hooks/useWallet";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Home() {
  const { address } = useWallet();
  const router = useRouter();
  const {
    addAnswer,
    answers,
    currentQuestion,
    isSurveyRunning,
    loadingSubmit,
    questionSecondsLeft,
    remainingTime,
    sendSurvey,
    startSurvey,
    survey,
    surveyAvailable,
  } = useSurvey();

  useEffect(() => {
    if (!address) {
      router.push("/");
    }
  }, [address, router]);

  if (!loadingSubmit && survey) {
    return (
      <Survey
        addAnswer={addAnswer}
        answers={answers}
        currentQuestion={currentQuestion}
        isSurveyRunning={isSurveyRunning}
        questionSecondsLeft={questionSecondsLeft}
        sendSurvey={sendSurvey}
        startSurvey={startSurvey}
        survey={survey}
      />
    );
  }

  if (!loadingSubmit && !surveyAvailable && remainingTime) {
    return (
      <CountDown title="Remaining time to next survey" count={remainingTime} />
    );
  }

  return <Spinner />;
}
