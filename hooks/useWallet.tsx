import { WalletContext } from "../contexts/WalletContext";
import { useContext } from "react";

export default function useWallet() {
  return useContext(WalletContext);
}
