import HiddenPasswordField from "@components/form/HiddenPasswordField";
import SignUpRequest from "@models/auth/SignUpRequest";
import { Button, Dialog, Typography } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import * as yup from "yup";
import FormTextField from "../form/FormTextField";
import "../Components.css";
import AuthAPI from "@api/AuthAPI";
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

	const handleSubmit = async (values: SignUpRequest) => {
		let request: SignUpRequest = {
			username: values.username,
			password: values.password,
			reEnterPassword: values.reEnterPassword,
			email: values.email,
			name: values.name,
			surname: values.surname,
		};
		let res = await AuthAPI.signup(request);
		console.log(res);

		// handleClose();
		// setTimeout(() => {
		// 	window.location.reload();
		// }, 300);
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
						<Typography variant="h1" className="dialog-box-label">
							Sign Up
						</Typography>
						<FormTextField
							label="Name"
							name="name"
							value={formik.values.name}
						/>

						<FormTextField
							label="Surname"
							name="surname"
							value={formik.values.surname}
						/>

						<FormTextField
							label="Username"
							name="username"
							value={formik.values.username}
						/>

						<FormTextField
							label="Email"
							name="email"
							value={formik.values.email}
						/>

						<HiddenPasswordField
							label="Password"
							name="password"
							variant={"outlined"}
						/>

						<HiddenPasswordField
							label="Re-enter password"
							name="reEnterPassword"
							variant={"outlined"}
						/>

						<div className="button-container">
							<Button
								className="signup-button"
								variant="outlined"
								onClick={handleSwitch}
							>
								<Typography className="button-text">Log in</Typography>
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
