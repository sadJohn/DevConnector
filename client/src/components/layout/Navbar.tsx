import * as React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appbar: {
      position: "fixed"
    },
    title: {
      flexGrow: 1
    }
  })
);

export interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = React.memo(() => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appbar}>
      <Toolbar>
        <Typography className={classes.title}>
          <Link to="/">DevConnector</Link>
        </Typography>
        <Button color="inherit">
          <Link to="/!#">Developers</Link>
        </Button>
        <Button color="inherit">
          <Link to="/register">Register</Link>
        </Button>
        <Button color="inherit">
          <Link to="/login">Login</Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
});

export default Navbar;
