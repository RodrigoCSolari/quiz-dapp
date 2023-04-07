import { buttonStyle, paragraphStyle, titleStyle } from "./index.style";
import { CopyOutlined, ExportOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row, Typography } from "antd";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  address: string;
  disconnect: () => void;
  balance: string;
  tokenName: string;
  tokenSymbol: string;
};

export default function AccountModal({
  showModal,
  setShowModal,
  address,
  disconnect,
  balance,
  tokenName,
  tokenSymbol,
}: Props) {
  const handleCopyAddress = async () => {
    await navigator.clipboard.writeText(address);
  };
  const handleDisconnect = async () => {
    setShowModal(false);
    disconnect();
  };

  return (
    <Modal
      open={showModal}
      onCancel={() => setShowModal(false)}
      footer={[
        <Row key="row" gutter={5}>
          <Col flex={1}>
            <Button
              style={buttonStyle}
              icon={<CopyOutlined />}
              type="primary"
              onClick={handleCopyAddress}
            >
              Copy address
            </Button>
          </Col>
          <Col flex={1}>
            <Button
              style={buttonStyle}
              icon={<ExportOutlined />}
              type="primary"
              onClick={handleDisconnect}
            >
              Disconnect
            </Button>
          </Col>
        </Row>,
      ]}
    >
      <Typography.Title level={5} style={titleStyle}>
        Account:
      </Typography.Title>
      <Typography.Paragraph style={paragraphStyle}>
        {address}
      </Typography.Paragraph>
      <Typography.Title level={5} style={titleStyle}>
        {tokenName} Balance:
      </Typography.Title>
      <Typography.Paragraph style={paragraphStyle}>
        {balance} {tokenSymbol}
      </Typography.Paragraph>
    </Modal>
  );
}
