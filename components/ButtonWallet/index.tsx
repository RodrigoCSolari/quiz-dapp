import { getConfig } from "@/config";
import useWallet from "@/hooks/useWallet";
import { showShortAccountId } from "@/lib/util";
import { RetweetOutlined } from "@ant-design/icons";
import { Button } from "antd";

const config = getConfig();

export const ButtonWallet = () => {
  const { address, chainId, connect, disconnect, swichToGoerli } = useWallet();

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

  return (
    <>
      <Button type="primary" onClick={disconnect}>
        {showShortAccountId(address)}
      </Button>
    </>
  );
};
