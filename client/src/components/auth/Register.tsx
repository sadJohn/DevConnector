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
import { useDispatch } from "react-redux";
import { register } from "../../actions/auth";

export interface RegisterProps {}

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
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
    signIn: {
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

const Register: React.FC<RegisterProps> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const initialvalues: RegisterFormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  };
  return (
    <Container className={classes.root}>
      <Typography className={classes.title} variant="h2" gutterBottom>
        Sign Up
      </Typography>
      <Typography gutterBottom>
        <AccountCircleIcon className={classes.icon} />
        Create Your Account
      </Typography>
      <Formik
        initialValues={initialvalues}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(5, "Must be 5 characters or more")
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .min(5, "Must be 5 characters or more")
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          confirmPassword: Yup.string()
            .min(5, "Must be 5 characters or more")
            .max(15, "Must be 15 characters or less")
            .required("Required")
            .test("passwords-match", "Passwords must match ya fool", function(
              value
            ) {
              return this.parent.password === value;
            })
        })}
        onSubmit={values => {
          const { name, email, password } = values;
          dispatch(register({ name, email, password }));
        }}
      >
        <Form className={classes.form}>
          <TextInput label="Name" name="name" type="text" placeholder="Name" />
          <TextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="Email Address"
          />
          <small>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
          <TextInput
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
          />
          <TextInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.formfield}
          >
            Register
          </Button>
        </Form>
      </Formik>
      <Typography>
        Already have an account?{" "}
        <Link to="/login" className={classes.signIn}>
          Sign In
        </Link>
      </Typography>
    </Container>
  );
};

export default Register;
