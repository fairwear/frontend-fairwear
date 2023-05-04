import AuthAPI from "@api/AuthAPI";
import FormTextField from "@components/form/FormTextField";
import HiddenPasswordField from "@components/form/HiddenPasswordField";
import LoginRequest from "@models/auth/LoginRequest";
import { Button, Dialog, Typography } from "@mui/material";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import "../Components.css";

interface Props {
	open: boolean;
	handleClose: () => void;
	toSignUp: () => void;
}

export default function LoginDialog(props: Props) {
	const { open, handleClose, toSignUp } = props;

	const handleSubmit = async (values: LoginRequest) => {
		await AuthAPI.login(values);

		handleClose();
		setTimeout(() => {
			window.location.reload();
		}, 300);
	};

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
			<Formik
				onSubmit={handleSubmit}
				initialValues={initialValues}
				validationSchema={validationSchema}
			>
				{(formik: FormikProps<LoginRequest>) => (
					<form className="login-form">
						<Typography variant="h1" className="dialog-box-label">
							Login
						</Typography>
						<FormTextField
							className="input"
							label="Username"
							name="username"
							value={formik.values.username}
						/>
						<HiddenPasswordField
							className="input"
							label="Password"
							name="password"
							variant={"outlined"}
						/>
						<div className="button-container">
							<Button
								className="signup-button"
								variant="outlined"
								onClick={handleSwitch}
							>
								<Typography>Sign Up</Typography>
							</Button>
							<Button
								className="login-button"
								variant="contained"
								// type="submit"
								onClick={() => handleSubmit(formik.values)}
							>
								<Typography className="login">Login</Typography>
							</Button>
						</div>
					</form>
				)}
			</Formik>
		</Dialog>
	);
}

const initialValues: LoginRequest = {
	username: "",
	password: "",
};

const validationSchema = yup.object({
	username: yup.string().required("Username is required"),
	password: yup.string().required("Password is required"),
});
