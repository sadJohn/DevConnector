import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/theme";
import Login from "./components/auth/Login";
import Resister from "./components/auth/Register";
import Container from "@material-ui/core/Container";
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert";

const App: React.FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Container style={{ height: "100%" }}>
          <Alert />
          <Switch>
            <Route exact path="/register" component={Resister} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  </Provider>
);

export default App;
