import CountDown from "@/components/CountDown";
import Spinner from "@/components/Spinner";
import useSurvey from "@/hooks/useSurvey";
import useWallet from "@/hooks/useWallet";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Home() {
  const { address } = useWallet();
  const router = useRouter();
  const { loadingSubmit, remainingTime, survey, surveyAvailable } = useSurvey();

  useEffect(() => {
    if (!address) {
      router.push("/");
    }
  }, [address, router]);

  if (!loadingSubmit && survey) {
    return <div>Survey</div>;
  }

  if (!loadingSubmit && !surveyAvailable && remainingTime) {
    return (
      <CountDown title="Remaining time to next survey" count={remainingTime} />
    );
  }

  return <Spinner />;
}
