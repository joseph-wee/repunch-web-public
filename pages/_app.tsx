import type { AppProps } from "next/app";
import { FooterBar, HeaderBar } from "../components";
import { GlobalStyle } from "../styles/global-styles";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import "../styles/global.css";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Repunch</title>
        <meta name="description" content="repunch 웹개발 테스트 사이트" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <HeaderBar />
        <Component {...pageProps} />
        <FooterBar />
      </Provider>
    </>
  );
}
