import React from "react";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/theme";

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Navbar />
    <Landing />
  </ThemeProvider>
);

export default App;
