import React, { useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Resister from "./components/auth/Register";
import Container from "@material-ui/core/Container";
import { useDispatch } from "react-redux";
import Alert from "./components/layout/Alert";
import { loadUser } from "./actions/auth";

const App: React.FC = () => {
  const dispatch = useCallback(useDispatch(), []);
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
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
  );
};

export default App;
