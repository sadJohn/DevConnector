import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/theme";
import Login from "./components/auth/Login";
import Resister from "./components/auth/Register";
import Container from "@material-ui/core/Container";

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <Container style={{ height: "100%" }}>
        <Switch>
          <Route exact path="/register" component={Resister} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Container>
    </Router>
  </ThemeProvider>
);

export default App;
