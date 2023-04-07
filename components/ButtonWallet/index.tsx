import { buttonSpanStyle } from "./index.style";
import AccountModal from "../AccountModal";
import { getConfig } from "@/config";
import useQuizToken from "@/hooks/useQuizToken";
import useWallet from "@/hooks/useWallet";
import { showShortAccountId } from "@/lib/util";
import { RetweetOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";

const config = getConfig();

export const ButtonWallet = () => {
  const [showModal, setShowModal] = useState(false);
  const { address, chainId, connect, disconnect, swichToGoerli } = useWallet();
  const { balance, tokenName, tokenSymbol } = useQuizToken();

  const handleShowModal = () => {
    setShowModal(true);
  };

  if (!address) {
    return <Button onClick={connect}>Connect Wallet</Button>;
  }

  if (address && chainId !== Number(config.chainId)) {
    return (
      <Button
        icon={<RetweetOutlined />}
        onClick={swichToGoerli}
        type="primary"
        danger
      >
        Change Network
      </Button>
    );
  }

  if (!balance || !tokenName || !tokenSymbol) {
    return <Button size="large" type="primary" loading></Button>;
  }

  return (
    <>
      <Button
        size="large"
        icon={
          <span style={buttonSpanStyle}>
            {balance} {tokenSymbol}
          </span>
        }
        type="primary"
        onClick={handleShowModal}
      >
        {showShortAccountId(address)}
      </Button>
      <AccountModal
        showModal={showModal}
        setShowModal={setShowModal}
        address={address}
        disconnect={disconnect}
        balance={balance}
        tokenName={tokenName}
        tokenSymbol={tokenSymbol}
      />
    </>
  );
};
