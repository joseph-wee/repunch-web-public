import type { AppProps } from "next/app";
import { FooterBar, HeaderBar } from "../components";
import { GlobalStyle } from "../styles/global-styles";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <HeaderBar />
        <Component {...pageProps} />
        <FooterBar />
      </Provider>
    </>
  );
}
