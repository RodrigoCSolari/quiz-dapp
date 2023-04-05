import { callChangeMethod, callViewMethod } from "./ethereum";
import { tokenQuizMethods } from "./methods";
import { etow } from "./util";
import { getConfig } from "../config";
import { ethers } from "ethers";

const { abi, tokenQuizAddress } = getConfig();

export const balanceOf = async (
  provider: ethers.providers.Provider,
  userAddress: string
) =>
  callViewMethod(
    tokenQuizMethods.balanceOf,
    [userAddress],
    provider,
    tokenQuizAddress,
    abi
  );

export const cooldownSeconds = async (provider: ethers.providers.Provider) =>
  callViewMethod(
    tokenQuizMethods.cooldownSeconds,
    [],
    provider,
    tokenQuizAddress,
    abi
  );

export const lastSubmittal = async (
  provider: ethers.providers.Provider,
  userAddress: string
) =>
  callViewMethod(
    tokenQuizMethods.lastSubmittal,
    [userAddress],
    provider,
    tokenQuizAddress,
    abi
  );

export const name = async (provider: ethers.providers.Provider) =>
  callViewMethod(tokenQuizMethods.name, [], provider, tokenQuizAddress, abi);

export const submit = (
  signer: ethers.Signer,
  surveyId: number,
  answerIds: number[]
) =>
  callChangeMethod(
    tokenQuizMethods.submit,
    [surveyId, answerIds],
    etow("0"),
    signer,
    tokenQuizAddress,
    abi
  );

export const symbol = async (provider: ethers.providers.Provider) =>
  callViewMethod(tokenQuizMethods.symbol, [], provider, tokenQuizAddress, abi);
