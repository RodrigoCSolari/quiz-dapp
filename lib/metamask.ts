import { Ethereum } from "./metamask.types";
import { getConfig } from "../config";

const config = getConfig();

export const requestAccounts = async (ethereum: Ethereum) =>
  ethereum.request({
    method: "eth_requestAccounts",
  });

export const requestGoerliChain = async (ethereum: Ethereum) =>
  ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: networkParams.chainId }],
  });

export const addGoerliToWallet = async (ethereum: Ethereum) =>
  ethereum.request({
    method: "wallet_addEthereumChain",
    params: [networkParams],
  });

const networkParams = {
  blockExplorerUrls: config.blockExplorerUrls,
  chainId: config.chainId,
  chainName: config.chainName,
  nativeCurrency: config.nativeCurrency,
  rpcUrls: config.rpcUrls,
};
