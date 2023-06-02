import LoginDialog from "@components/login/LoginDialog";
import SignUpDialog from "@components/login/SignUpDialog";
import { Button, Menu, Typography } from "@mui/material";
import { useAppSelector } from "@redux/store/hooks";
import { useNavigate } from "react-router-dom";

interface HeaderMenuProps {
	open: boolean;
	anchorEl: HTMLElement | null;
	handleClose: () => void;
	signupDialogOpen: boolean;
	handleSignupDialogOpen: () => void;
	handleSignupDialogClose: () => void;
	loginDialogOpen: boolean;
	handleLoginDialogOpen: () => void;
	handleLoginDialogClose: () => void;
	handleLogout: () => void;
}

const HeaderMenu = (props: HeaderMenuProps) => {
	const {
		open,
		anchorEl,
		handleClose,
		signupDialogOpen,
		handleSignupDialogOpen,
		handleSignupDialogClose,
		loginDialogOpen,
		handleLoginDialogOpen,
		handleLoginDialogClose,
		handleLogout,
	} = props;

	const isLoggedIn = useAppSelector((state) => state.common.isLoggedIn);

	const navigate = useNavigate();

	return (
		<Menu
			id="header-menu"
			open={open}
			anchorEl={anchorEl}
			onClose={handleClose}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "right",
			}}
			keepMounted
			transformOrigin={{
				vertical: "bottom",
				horizontal: "right",
			}}
		>
			{!isLoggedIn ? (
				<div className="menu-container">
					<Button className="auth-button" onClick={handleLoginDialogOpen}>
						<Typography variant="h4">Log in</Typography>
					</Button>
					<LoginDialog
						open={loginDialogOpen}
						handleClose={handleLoginDialogClose}
					/>

					<Button className="auth-button" onClick={handleSignupDialogOpen}>
						<Typography variant="h4">Sign up</Typography>
					</Button>
					<SignUpDialog
						open={signupDialogOpen}
						handleClose={handleSignupDialogClose}
					/>
				</div>
			) : (
				<div className="menu-container">
					<Button
						className="auth-button"
						onClick={() => navigate("/contribute")}
					>
						<Typography variant="h5" className="logout-button">
							Contribute
						</Typography>
					</Button>
					<Button className="auth-button" onClick={() => navigate("/profile")}>
						<Typography variant="h5" className="logout-button">
							Profile
						</Typography>
					</Button>
					<Button className="auth-button" onClick={handleLogout}>
						<Typography variant="h5" className="logout-button">
							Logout
						</Typography>
					</Button>
					{/* <Button onClick={() => console.log("Profile")}>
						<AccountCircle style={{ color: "rgba(34, 34, 34, 0.5)" }} />
					</Button> */}
				</div>
			)}
		</Menu>
	);
};

export default HeaderMenu;
