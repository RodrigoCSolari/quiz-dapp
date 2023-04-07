import useWallet from "@/hooks/useWallet";
import { Col, Row, Space, Typography } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Disconnected() {
  const { address } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (address) {
      router.push("/home");
    }
  }, [address, router]);

  return (
    <Row justify="center">
      <Col>
        <Space size="middle" direction="vertical">
          <Typography.Title level={5}>
            Connect your wallet to earn Quiz Tokens
          </Typography.Title>
        </Space>
      </Col>
    </Row>
  );
}
