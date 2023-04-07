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
import { createContext, useCallback, useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type QuizTokenContextType = {
  balance: string | undefined;
  errorMsg: string;
  getTimeLeft: () => string | undefined;
  loadingSubmit: boolean;
  removeError: () => void;
  submitSurvey: (surveyId: number, answerId: number[]) => Promise<void>;
  tokenName: string | undefined;
  tokenSymbol: string | undefined;
};

export const QuizTokenContext = createContext<QuizTokenContextType>(
  {} as QuizTokenContextType
);

export default function QuizTokenProvider({ children }: Props) {
  const { address, signer, provider } = useWallet();
  const [balance, setBalance] = useState<string | undefined>("");
  const [timeLockSurvey, setTimeLockSurvey] = useState<number | undefined>();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [tokenName, setTokenName] = useState<string | undefined>("");
  const [tokenSymbol, setTokenSymbol] = useState<string | undefined>("");
  const [errorMsg, setErrorMsg] = useState("");

  const removeError = () => {
    setErrorMsg("");
  };

  const getTimeLeft = () => {
    if (timeLockSurvey) {
      return getTimeLeftClock(timeLockSurvey - Math.floor(Date.now() / 1000));
    }
  };

  const fetchContractData = useCallback(() => {
    if (provider && address) {
      Promise.all([
        cooldownSeconds(provider),
        name(provider),
        symbol(provider),
        balanceOf(provider, address),
        lastSubmittal(provider, address),
      ])
        .then((values) => {
          setTokenName(values[1]);
          setTokenSymbol(values[2]);
          setBalance(wtoeCommify(values[3]));
          setTimeLockSurvey(Number(values[0]) + Number(values[4]));
        })
        .catch((error) => {
          const errorMessage = getErrorMessage(error);
          setErrorMsg(errorMessage);
        });
    } else {
      setTokenName(undefined);
      setTokenSymbol(undefined);
      setBalance(undefined);
      setTimeLockSurvey(undefined);
    }
  }, [address, provider]);

  const submitSurvey = async (surveyId: number, answerId: number[]) => {
    if (signer && provider && address) {
      try {
        setLoadingSubmit(true);
        const resp = await submit(signer, surveyId, answerId);
        await resp.wait();
        fetchContractData();
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        setErrorMsg(errorMessage);
      }
      setLoadingSubmit(false);
    }
    setErrorMsg("Your wallet is disconnect");
  };

  useEffect(() => {
    fetchContractData();
  }, [provider, address, fetchContractData]);

  return (
    <QuizTokenContext.Provider
      value={{
        balance,
        errorMsg,
        getTimeLeft,
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
