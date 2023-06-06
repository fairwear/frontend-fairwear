import AuthAPI from "@api/AuthAPI";
import DialogHeader from "@components/dialog/DialogHeader";
import HiddenPasswordField from "@components/form/HiddenPasswordField";
import SignUpRequest from "@models/auth/SignUpRequest";
import { Button, Dialog, Typography } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import * as yup from "yup";
import "../Components.css";
import FormTextField from "../form/FormTextField";
import "./Login.css";
interface Props {
	open: boolean;
	handleClose: () => void;
}

export default function SignUpDialog(props: Props) {
	const { open, handleClose } = props;

	const handleSubmit = async (values: SignUpRequest) => {
		let req: SignUpRequest = {
			username: values.username.trim(),
			email: values.email.trim(),
			name: values.name.trim(),
			surname: values.surname.trim(),
			password: values.password.trim(),
			reEnterPassword: values.reEnterPassword.trim(),
		};

		await AuthAPI.signup(req);

		handleClose();
		setTimeout(() => {
			window.location.reload();
		}, 300);
	};

	return (
		<Dialog
			open={open}
			PaperProps={{
				className: "authentication-dialog",
			}}
		>
			<DialogHeader
				title="Sign up"
				titleTypographyVariant="h1"
				containerStyle={{
					padding: "24px 0px",
				}}
			/>
			<Formik
				onSubmit={handleSubmit}
				initialValues={initialValues}
				validationSchema={validationSchema}
			>
				{(formik: FormikProps<SignUpRequest>) => (
					<Form className="authentication-form">
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
						<HiddenPasswordField label="Password" name="password" />
						<HiddenPasswordField
							label="Re-enter password"
							name="reEnterPassword"
						/>
						<div className="authentication-dialog-button-container">
							<Button
								className="cancel-dialog-action-button"
								variant="outlined"
								onClick={handleClose}
							>
								<Typography variant="button" fontWeight={400}>
									Cancel
								</Typography>
							</Button>
							<Button
								className="main-dialog-action-button"
								variant="contained"
								type="submit"
							>
								<Typography variant="button">Sign up</Typography>
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
