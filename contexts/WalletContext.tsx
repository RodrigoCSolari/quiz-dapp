import {
  addGoerliToWallet,
  requestAccounts,
  requestGoerliChain,
} from "../lib/metamask";
import { ProviderRpcError } from "../lib/metamask.types";
import { getErrorMessage } from "../utils/getErrorMessage";
import { ethers } from "ethers";
import { createContext, useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type WalletContextType = {
  address: string | undefined;
  chainId: number | undefined;
  connect: () => void;
  disconnect: () => void;
  errorMsg: string;
  provider: ethers.providers.Web3Provider | undefined;
  removeError: () => void;
  signer: ethers.providers.JsonRpcSigner | undefined;
  swichToGoerli: () => void;
};

export const WalletContext = createContext<WalletContextType>(
  {} as WalletContextType
);

export default function WalletProvider({ children }: Props) {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [address, setAddress] = useState<string>();
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
  const [chainId, setChainId] = useState<number>();
  const [errorMsg, setErrorMsg] = useState("");

  const connect = async () => {
    if (typeof window.ethereum !== "undefined") {
      const { ethereum } = window;
      try {
        await requestAccounts(ethereum);
        const _provider = new ethers.providers.Web3Provider(ethereum);
        setProvider(_provider);
        const _signer = _provider.getSigner();
        setSigner(_signer);
        const network = await _provider.getNetwork();
        setChainId(network.chainId);
        const addr = await _signer.getAddress();
        setAddress(addr);
      } catch (error) {
        const _errorMsg = getErrorMessage(error);
        setErrorMsg(_errorMsg);
      }
    }
  };

  const disconnect = async () => {
    setAddress(undefined);
    setProvider(undefined);
    setSigner(undefined);
    setChainId(undefined);
  };

  const listener = () => {
    connect();
  };

  const removeError = () => {
    setErrorMsg("");
  };

  const swichToGoerli = async () => {
    if (chainId !== 5 && window.ethereum) {
      const { ethereum } = window;
      try {
        await requestGoerliChain(ethereum);
      } catch (error) {
        if (error instanceof ProviderRpcError && error.code === 4902) {
          try {
            await addGoerliToWallet(ethereum);
            return;
          } catch (err) {
            const _errorMsg = getErrorMessage(err);
            setErrorMsg(_errorMsg);
          }
        } else {
          const _errorMsg = getErrorMessage(error);
          setErrorMsg(_errorMsg);
        }
      }
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => listener());
      window.ethereum.on("chainChanged", () => listener());
      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener("accountsChanged", () => listener());
          window.ethereum.removeListener("chainChanged", () => listener());
        }
      };
    }
  });

  return (
    <WalletContext.Provider
      value={{
        address,
        chainId,
        connect,
        disconnect,
        errorMsg,
        provider,
        removeError,
        signer,
        swichToGoerli,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
