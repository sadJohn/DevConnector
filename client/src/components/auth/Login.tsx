import * as React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";

export interface LoginProps {}

interface LoginFormValues {
  email: string;
  password: string;
}

interface FormFieldValues {
  name: string;
  label: string;
  type: string;
  placeholder: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      paddingTop: "10rem"
    },
    title: {
      color: theme.palette.primary.main
    },
    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "end"
    },
    icon: {
      verticalAlign: "sub",
      marginRight: theme.spacing(0.5)
    },
    formfield: {
      marginBottom: theme.spacing(2)
    },
    signUp: {
      color: theme.palette.primary.main
    }
  })
);

const TextInput = ({ label, ...props }: FormFieldValues) => {
  const classes = useStyles();
  const [field, meta] = useField(props);
  const error = meta.touched && meta.error;
  return (
    <TextField
      error={!!error}
      label={!!error ? (error as string) : label}
      {...field}
      {...props}
      fullWidth
      className={classes.formfield}
    />
  );
};

const Login: React.FC<LoginProps> = () => {
  const classes = useStyles();
  const initialvalues: LoginFormValues = {
    email: "",
    password: ""
  };
  return (
    <Container className={classes.root}>
      <Typography className={classes.title} variant="h2" gutterBottom>
        Sign in
      </Typography>
      <Typography gutterBottom>
        <AccountCircleIcon className={classes.icon} />
        Sign into Your Account
      </Typography>
      <Formik
        initialValues={initialvalues}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .min(5, "Must be 5 characters or more")
            .max(15, "Must be 15 characters or less")
            .required("Required")
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
        }}
      >
        <Form className={classes.form}>
          <TextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="Email Address"
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.formfield}
          >
            Login
          </Button>
        </Form>
      </Formik>
      <Typography>
        Don't have an account?{" "}
        <Link to="/register" className={classes.signUp}>
          Sign Up
        </Link>
      </Typography>
    </Container>
  );
};

export default Login;
