import { footerStyle, textStyle } from "./index.style";
import { Row, Typography } from "antd";

export default function Footer() {
  return (
    <Row style={footerStyle}>
      <Typography.Text style={textStyle}>
        &copy; {new Date().getFullYear()} Quiz Token Company. All Rights
        Reserved.
      </Typography.Text>
    </Row>
  );
}
