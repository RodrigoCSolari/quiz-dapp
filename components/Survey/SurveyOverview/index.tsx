import { dividerStyle, spaceStyle } from "./index.style";
import { Button, Col, Divider, Row, Space, Typography } from "antd";

type Props = {
  answers: number[];
  sendSurvey: () => void;
  questions: {
    image: string;
    lifetimeSeconds: number;
    options: {
      text: string;
    }[];
    text: string;
  }[];
};

export default function SurveyOverview({
  answers,
  sendSurvey,
  questions,
}: Props) {
  return (
    <Row justify="center">
      <Col>
        <Space direction="vertical" style={spaceStyle}>
          <Typography.Title level={3}>Overview</Typography.Title>
          {answers.map((item, index) => (
            <div key={index}>
              <Divider style={dividerStyle}>{`${index + 1} - ${
                questions[index].text
              }`}</Divider>
              <Typography.Paragraph>{`Answer: ${questions[index].options[item].text}`}</Typography.Paragraph>
            </div>
          ))}{" "}
        </Space>
        <Row justify="center">
          <Button onClick={sendSurvey}>Send Quiz</Button>
        </Row>
      </Col>
    </Row>
  );
}
