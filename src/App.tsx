/** @format */

import * as React from "react";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "components";

import Todo from "./pages";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Todo />
    </ThemeProvider>
  );
};

export default App;
