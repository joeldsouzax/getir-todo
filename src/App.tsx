/** @format */

import * as React from "react";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "components";
import { Provider } from "react-redux";
import Todo from "./pages";
import store from "./state";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Todo />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
