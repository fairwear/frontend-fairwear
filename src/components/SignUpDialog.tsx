import { Button, Dialog, TextField, Typography } from "@mui/material";
import "./Components.css";
import * as yup from "yup";
import SignUpRequest from "../models/auth/SignUpRequest";
import { Form, Formik, FormikProps } from "formik";
import FormTextField from "./form/FormTextField";
import HiddenPasswordField from "./form/HiddenPasswordField";
interface Props {
  open: boolean;
  handleClose: () => void;
  toLogin: () => void;
}

export default function SignUpDialog(props: Props) {
  const { open, handleClose, toLogin } = props;

  const handleSwitch = () => {
    handleClose();
    toLogin();
  };

  const handleSubmit = (values: SignUpRequest) => {
    let request: SignUpRequest = {
      username: values.username,
      password: values.password,
      reEnterPassword: values.reEnterPassword,
      email: values.email,
      name: values.name,
      surname: values.surname,
    };
    console.log(request);
    console.log(values);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        className: "dialog-section",
      }}
    >
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(formik: FormikProps<SignUpRequest>) => (
          <Form className="login-form">
            <Typography variant="h1" className="dialog-box-label">Sign Up
            </Typography>
            <FormTextField
              title="Name"
              name="name"
              placeholder="Name"
              value={formik.values.name}
            />

            <FormTextField
              title="Surname"
              name="surname"
              placeholder="Surname"
              value={formik.values.surname}
            />

            <FormTextField
              title="Username"
              name="username"
              placeholder="Username"
              value={formik.values.username}
            />

            <FormTextField
              title="Email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
            />

            <HiddenPasswordField
              title="Password"
              name="password"
            />

            <HiddenPasswordField
              title="Re-enter Password"
              name="reEnterPassword"
            />

            <div className="button-container">
              <Button
                className="signup-button"
                variant="outlined"
                onClick={handleSwitch}
              >
                <Typography
                  className="button-text"
                >Log in</Typography>
              </Button>
              <Button className="login" variant="contained" type="submit">
                <Typography className="login button-text">Sign Up</Typography>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  reEnterPassword: yup
    .string()
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
  email: yup.string().email("Invalid email").required("Email is required"),
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Surname is required"),
});

const initialValues: SignUpRequest = {
  username: "",
  password: "",
  reEnterPassword: "",
  email: "",
  name: "",
  surname: "",
};
