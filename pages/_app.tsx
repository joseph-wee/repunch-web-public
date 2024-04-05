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
        <meta name="description" content="repunch web" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:image"
          content="http://http://test.repunch.io/android-chrome-192x192.png"
        />
        <meta property="og:title" content="Repunch" />
        {/* <meta property="og:description" content="text" />	//카카오톡에 링크를 전송하면 보이는 내용을 text로 설정 */}
        <link rel="icon" href="/favicon.ico" />

        {/** 1. 즐겨찾기 아이콘?  2.아이패드 아이콘?*/}
        {/* <link rel="shortcut icon" href="http://test.repunch.io/favicon.ico" />
        
        <link
          rel="apple-touch-startup-image"
          href="http://test.repunch.io/favicon.ico"
        /> */}

        {/** 안드로이드 현재 폰에서는 되는중 탭안되면 고해상도 아이콘 소스코드 추가하면 될 듯? */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" />

        {/** 테마랑 타이틀 관련 컬러인 듯? 나중에 필요하면 참고해서 적용 */}
        {/* <meta name="msapplication-TileColor" content="#da532c">
<meta name="theme-color" content="#ffffff"></meta> */}
      </Head>
      <Provider store={store}>
        <HeaderBar />
        <Component {...pageProps} />
        <FooterBar />
      </Provider>
    </>
  );
}
