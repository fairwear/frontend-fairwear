import LoginDialog from "@components/login/LoginDialog";
import SignUpDialog from "@components/login/SignUpDialog";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import "./Login.css";

const NotLoggedInComponent = () => {
	const [loginDialogOpen, setLoginDialogOpen] = useState(false);
	const [registerDialogOpen, setRegisterDialogOpen] = useState(false);

	const handleLoginDialogOpen = () => {
		setLoginDialogOpen(true);
	};

	const handleLoginDialogClose = () => {
		setLoginDialogOpen(false);
	};

	const handleRegisterDialogOpen = () => {
		setRegisterDialogOpen(true);
	};

	const handleRegisterDialogClose = () => {
		setRegisterDialogOpen(false);
	};

	return (
		<div className="not-logged-in-component-container">
			<Typography variant="h3" color="white" align="center">
				This action is only available to logged in users
			</Typography>
			<Typography variant="h5" color="white" align="center">
				Please log in or sign up to continue...
			</Typography>
			<div className="not-logged-in-component-outside-container">
				<div className="not-logged-in-component-inner-container">
					<Button
						onClick={handleLoginDialogOpen}
						variant="outlined"
						className="login-button"
					>
						<Typography variant="h5">Login</Typography>
					</Button>
					<Button
						onClick={handleRegisterDialogOpen}
						variant="outlined"
						className="register-button"
					>
						<Typography
							variant="h5"
							style={{
								color: "white",
								textTransform: "none",
							}}
						>
							Sign Up
						</Typography>
					</Button>
				</div>
				<LoginDialog
					open={loginDialogOpen}
					handleClose={handleLoginDialogClose}
					toSignUp={handleRegisterDialogOpen}
				/>
				<SignUpDialog
					open={registerDialogOpen}
					handleClose={handleRegisterDialogClose}
					toLogin={handleLoginDialogOpen}
				/>
			</div>
		</div>
	);
};

export default NotLoggedInComponent;
