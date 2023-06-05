import AuthAPI from "@api/AuthAPI";
import DialogHeader from "@components/dialog/DialogHeader";
import ErrorBanner from "@components/form/ErrorBanner";
import FormTextField from "@components/form/FormTextField";
import HiddenPasswordField from "@components/form/HiddenPasswordField";
import LoginRequest from "@models/auth/LoginRequest";
import { Button, Dialog, Typography } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { useState } from "react";
import * as yup from "yup";
import "../Components.css";
import "./Login.css";

interface Props {
	open: boolean;
	handleClose: () => void;
}

export default function LoginDialog(props: Props) {
	const { open } = props;
	const [error, setError] = useState<string | undefined>();

	const handleSubmit = async (values: LoginRequest) => {
		try {
			setTimeout(() => {
				setError(undefined);
			}, 200);
			await AuthAPI.login(values);
			handleClose();
			setTimeout(() => {
				window.location.reload();
			}, 300);
		} catch (error: any) {
			if (error.response.status === 404) {
				setTimeout(() => {
					setError("Username or password is incorrect");
				}, 300);
			}
		}
	};

	const handleClose = () => {
		setError(undefined);
		props.handleClose();
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			PaperProps={{
				className: "authentication-dialog",
			}}
		>
			<DialogHeader
				title="Login"
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
				{(formik: FormikProps<LoginRequest>) => (
					<Form className="authentication-form">
						<FormTextField className="input" label="Username" name="username" />
						<HiddenPasswordField
							className="input"
							label="Password"
							name="password"
						/>
						{error && <ErrorBanner errorMessage={error} />}

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
								<Typography variant="button">Login</Typography>
							</Button>
						</div>
					</Form>
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
