import { paragraphStyle } from "./index.style";
import { Col, Row, Space, Typography } from "antd";

type Props = {
  count: string;
  title: string;
};

export default function CountDown({ count, title }: Props) {
  return (
    <Row justify="center">
      <Col>
        <Space size="middle" direction="vertical">
          <Typography.Title level={3}>{title}</Typography.Title>
          <Typography.Paragraph style={paragraphStyle}>
            {count}
          </Typography.Paragraph>
        </Space>
      </Col>
    </Row>
  );
}
