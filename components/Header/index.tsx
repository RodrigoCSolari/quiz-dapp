import { header, menu } from "./index.style";
import { ButtonWallet } from "../ButtonWallet";
import { Col, Row } from "antd";
import Link from "next/link";

export default function Header(): JSX.Element {
  return (
    <Row style={header}>
      <Col flex={1}>
        <Link href="/" style={menu}>
          QuizDapp
        </Link>
      </Col>
      <Col flex={1}>
        <ButtonWallet />
      </Col>
    </Row>
  );
}
