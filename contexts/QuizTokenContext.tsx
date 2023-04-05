import useWallet from "../hooks/useWallet";
import { wtoeCommify } from "../lib/util";
import { getErrorMessage } from "../utils/getErrorMessage";
import {
  balanceOf,
  cooldownSeconds,
  lastSubmittal,
  name,
  submit,
  symbol,
} from "@/lib/quizToken";
import { getTimeLeftClock } from "@/utils/getTimeLeftClock";
import { createContext, useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type QuizTokenContextType = {
  balance: string | undefined;
  cooldownSec: number | undefined;
  errorMsg: string;
  getTimeLeft: () => string;
  lastSubmit: number | undefined;
  loadingSubmit: boolean;
  removeError: () => void;
  submitSurvey: (surveyId: number, answerId: number[]) => void;
  tokenName: string | undefined;
  tokenSymbol: string | undefined;
};

export const QuizTokenContext = createContext<QuizTokenContextType>(
  {} as QuizTokenContextType
);

export default function QuizTokenProvider({ children }: Props) {
  const { address, signer, provider } = useWallet();
  const [balance, setBalance] = useState<string | undefined>("");
  const [cooldownSec, setCooldownSec] = useState<number | undefined>();
  const [lastSubmit, setLastSubmit] = useState<number | undefined>();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [tokenName, setTokenName] = useState<string | undefined>("");
  const [tokenSymbol, setTokenSymbol] = useState<string | undefined>("");
  const [errorMsg, setErrorMsg] = useState("");

  const removeError = () => {
    setErrorMsg("");
  };

  const getTimeLeft = () => {
    if (lastSubmit && cooldownSec) {
      return getTimeLeftClock(
        lastSubmit + cooldownSec - Math.floor(Date.now() / 1000)
      );
    }
    return "";
  };

  const submitSurvey = async (surveyId: number, answerId: number[]) => {
    if (signer && provider && address) {
      try {
        setLoadingSubmit(true);
        const resp = await submit(signer, surveyId, answerId);
        await resp.await();
        const _balance = await balanceOf(provider, address);
        setBalance(_balance);
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        setErrorMsg(errorMessage);
      }
      setLoadingSubmit(false);
    }
    setErrorMsg("Your wallet is disconnect");
  };

  useEffect(() => {
    if (provider && address) {
      Promise.all([
        cooldownSeconds(provider),
        name(provider),
        symbol(provider),
        balanceOf(provider, address),
        lastSubmittal(provider, address),
      ])
        .then((values) => {
          setCooldownSec(Number(values[0]));
          setTokenName(values[1]);
          setTokenSymbol(values[2]);
          setBalance(wtoeCommify(values[3]));
          setLastSubmit(Number(values[4]));
        })
        .catch((error) => {
          const errorMessage = getErrorMessage(error);
          setErrorMsg(errorMessage);
        });
    } else {
      setCooldownSec(undefined);
      setTokenName(undefined);
      setTokenSymbol(undefined);
      setBalance(undefined);
      setLastSubmit(undefined);
    }
  }, [provider, address]);

  return (
    <QuizTokenContext.Provider
      value={{
        balance,
        cooldownSec,
        errorMsg,
        getTimeLeft,
        lastSubmit,
        loadingSubmit,
        removeError,
        submitSurvey,
        tokenName,
        tokenSymbol,
      }}
    >
      {children}
    </QuizTokenContext.Provider>
  );
}
