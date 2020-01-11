import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      height: "100%",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    buttonGroup: {
      textAlign: "center",
      marginTop: "1.2rem"
    }
  })
);

export interface LandingProps {}

const Landing: React.SFC<LandingProps> = () => {
  const classes = useStyles();

  return (
    <Container
      classes={{
        root: classes.root
      }}
    >
      <Typography variant="h2" gutterBottom>
        Developer Connector
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Create a developer profile/portfolio, share posts and get help from
        other developers.
      </Typography>
      <Container className={classes.buttonGroup}>
        <Button variant="contained" color="primary">
          Sign Up
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "2rem" }}
        >
          Login
        </Button>
      </Container>
    </Container>
  );
};

export default Landing;
