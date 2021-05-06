import React from "react";
import { HashRouter as Router } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "./Styles/GlobalStyles";
import Theme from "./Styles/Theme";
import Routes from "./Routes";
import Header from "./Header";
import Footer from "./Footer";

const Wrapper = styled.div``;
const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Router>
        <Wrapper>
          <Header />
          <Routes />
          <Footer />
        </Wrapper>
      </Router>
    </ThemeProvider>
  );
};

export default App;
