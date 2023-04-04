import { layoutStyle } from "./_app.style";
import Header from "../components/Header";
import Footer from "@/components/Footer";
import { BG_BASE, PRIMARY_COLOR } from "@/constants/colors";
import { ConfigProvider, Layout } from "antd";
import type { AppProps } from "next/app";
import Head from "next/head";
import "antd/dist/reset.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        token: { colorBgBase: BG_BASE, colorPrimary: PRIMARY_COLOR },
      }}
    >
      <Head>
        <title>QuizDapp</title>
        <meta name="description" content="complete quiz and earn quiz tokens" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout style={layoutStyle}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Layout>
    </ConfigProvider>
  );
}
