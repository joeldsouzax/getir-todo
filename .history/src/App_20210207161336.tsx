/** @format */

import * as React from "react";
import { ThemeProvider } from "styled-components";
import Todo from "./pages";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Todo />
    </ThemeProvider>
  );
};

export default App;
