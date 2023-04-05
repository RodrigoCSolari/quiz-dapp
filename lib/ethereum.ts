import { CallArgs } from "./ethereum.types";
import {
  BigNumber,
  Contract,
  ContractInterface,
  ethers,
  providers,
  Signer,
} from "ethers";

export const callChangeMethod = (
  method: string,
  args: CallArgs,
  value: BigNumber = BigNumber.from("0"),
  signer: Signer,
  contractAddress: string,
  abi: ContractInterface
) => {
  const writeContract = new Contract(contractAddress, abi, signer);
  const resp = writeContract[method](...args, {
    value,
  });
  return resp;
};

export const callViewMethod = (
  method: string,
  args: CallArgs,
  provider: providers.Provider,
  contractAddress: string,
  abi: ContractInterface
) => {
  const readContract = new ethers.Contract(contractAddress, abi, provider);
  const resp = readContract[method](...args);
  return resp;
};
