import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

export const GlobalStyle = createGlobalStyle`
    ${reset}

    html {
        position: relative;
        font-family: 'Roboto';
        padding-top: 64px;
        padding-bottom: 114.35px;
        min-height: 100vh;
        box-sizing: border-box;
    }
    * {
        font-family: 'Roboto';
    }
`;
