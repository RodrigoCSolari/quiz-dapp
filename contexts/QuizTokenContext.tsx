import useWallet from "../hooks/useWallet";
import { wtoeCommify } from "../lib/util";
import useNotify from "@/hooks/useNotify";
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
  getTimeLeft: () => string | undefined;
  loadingSubmit: boolean;
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
  const { setErrorMsg, showSuccessMsg } = useNotify();

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
          setErrorMsg(error);
        });
    } else {
      setTokenName(undefined);
      setTokenSymbol(undefined);
      setBalance(undefined);
      setTimeLockSurvey(undefined);
    }
  }, [address, provider, setErrorMsg]);

  const submitSurvey = async (surveyId: number, answerId: number[]) => {
    if (signer && provider && address) {
      try {
        setLoadingSubmit(true);
        const resp = await submit(signer, surveyId, answerId);
        await resp.wait();
        fetchContractData();
        showSuccessMsg();
      } catch (error) {
        setErrorMsg(error);
      }
      setLoadingSubmit(false);
    }
  };

  useEffect(() => {
    fetchContractData();
  }, [provider, address, fetchContractData]);

  return (
    <QuizTokenContext.Provider
      value={{
        balance,
        getTimeLeft,
        loadingSubmit,
        submitSurvey,
        tokenName,
        tokenSymbol,
      }}
    >
      {children}
    </QuizTokenContext.Provider>
  );
}
