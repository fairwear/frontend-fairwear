import { Button, Dialog, TextField, Typography } from "@mui/material";
import React from "react";
import "./Components.css";
import { Formik } from "formik";
interface Props {
  open: boolean;
  handleClose: () => void;
  toSignUp: () => void;
}

export default function LoginDialog(props: Props) {
  const { open, handleClose, toSignUp } = props;

  const handleSwitch = () => {
    handleClose();
    toSignUp();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        className: "dialog-section",
      }}
    >
      <form className="login-form">
        <Typography variant="h1" className="dialog-box-label">
          Login
        </Typography>
        <TextField className="input" required label="Username" />
        <TextField className="input" required label="Password" />
        <div className="button-container">
          <Button
            className="signup-button"
            variant="outlined"
            onClick={handleSwitch}
          >
            <Typography>Sign Up</Typography>
          </Button>
          <Button className="login-button" variant="contained">
            <Typography className="login">Login</Typography>
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
