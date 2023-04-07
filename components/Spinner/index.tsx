import { Col, Row, Space, Spin } from "antd";

export default function Spinner() {
  return (
    <Row justify="center">
      <Col>
        <Space size="middle">
          <Spin size="large" />
        </Space>
      </Col>
    </Row>
  );
}
