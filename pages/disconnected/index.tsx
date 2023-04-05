import useWallet from "@/hooks/useWallet";
import { Col, Row, Typography } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Disconnected() {
  const { address } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (address) {
      router.push("/survey");
    }
  }, [address, router]);

  return (
    <Row justify="center">
      <Col>
        <Typography.Text>
          Connect your wallet to earn Quiz Tokens
        </Typography.Text>
      </Col>
    </Row>
  );
}
