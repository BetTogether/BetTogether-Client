import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { theme } from "./utils/theme";
import App from "./App";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box; 
    }
    body {
        font-family: Cairo, sans-serif;
        margin: 0;
        position: relative;
        background-color: #dddfe6;
    }
    @font-face {
      font-family: 'Cairo';
      font-style: normal;
      font-weight: 600;
      font-display: swap;
      src: local('Cairo SemiBold'), local('Cairo-SemiBold'), url(https://fonts.gstatic.com/s/cairo/v6/SLXLc1nY6Hkvalr-ao6L59Zea3Zl.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    a:hover {
      color: inherit; 
      text-decoration: none; 
      cursor: pointer;  
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type=number] {
      -moz-appearance: textfield;
    }

    textarea:focus, input:focus{
        outline: none;
    }
`;

// This is the official Aave subgraph. You can replace it with your own, if you need to.
// See all subgraphs: https://thegraph.com/explorer/
const client = new ApolloClient({
  uri:
    "https://api.thegraph.com/subgraphs/id/QmcKPoG3SueUkEbhKpf65s3CJQhVPCRbSfH6b4yWza13GY",
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
