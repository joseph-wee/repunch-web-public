import type { AppProps } from "next/app";
import { FooterBar, HeaderBar } from "../components";
import { GlobalStyle } from "../styles/global-styles";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <HeaderBar />
      <Component {...pageProps} />
      <FooterBar />
    </>
  );
}
