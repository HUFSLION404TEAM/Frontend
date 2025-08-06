import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    font-weight: 400;
  }

  body {
    background-color: #fff;
    color: #000;
  }
`;

export default GlobalStyle;