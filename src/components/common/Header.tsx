import AuthAPI from "@api/AuthAPI";
import LoginDialog from "@components/login/LoginDialog";
import SignUpDialog from "@components/login/SignUpDialog";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import { alpha, styled } from "@mui/material/styles";
import { useAppSelector } from "@redux/store/hooks";
import * as React from "react";
import "../Components.css";
import "./CommonComponents.css";
import ContributeButton from "./ContributeButton";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "70%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		// width: 'auto',
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	border: "1px solid black",
	borderRadius: "10px",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		// width: '100%',
		[theme.breakpoints.up("md")]: {},
	},
}));

export default function PrimarySearchAppBar() {
	const [loginDialog, setLoginDialog] = React.useState(false);
	const [signUpDialog, setSignUpDialog] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
		React.useState<null | HTMLElement>(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleLogout = async () => {
		await AuthAPI.logout();
		window.location.reload();
	};

	const navigate = useNavigate();

	const isLoggedIn = useAppSelector((state) => state.common.isLoggedIn);

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleLoginDialog = () => {
		setLoginDialog(true);
	};

	const handleLoginDialogClose = () => {
		setLoginDialog(false);
	};

	const handleSignUpDialog = () => {
		setSignUpDialog(true);
	};
	const handleSignUpDialogClose = () => {
		setSignUpDialog(false);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			<MenuItem onClick={handleMenuClose}>My account</MenuItem>
		</Menu>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			{!isLoggedIn ? (
				<div className="menu-container">
					<Button sx={{ textTransform: "none" }} onClick={handleLoginDialog}>
						<Typography variant="h4" className="header-text">
							Log in
						</Typography>
					</Button>
					<LoginDialog
						open={loginDialog}
						handleClose={handleLoginDialogClose}
					/>

					<Button className="signup-button" onClick={handleSignUpDialog}>
						<Typography variant="h4">Sign up</Typography>
					</Button>
					<SignUpDialog
						open={signUpDialog}
						handleClose={handleSignUpDialogClose}
					/>
				</div>
			) : (
				<div className="menu-container">
					<ContributeButton handleClick={() => navigate("/contribute")} />
					<Button onClick={handleLogout}>
						<Typography variant="h4" className="logout-button">
							Logout
						</Typography>
					</Button>
					<Button onClick={handleProfileMenuOpen}>
						<AccountCircleIcon style={{ color: "rgba(34, 34, 34, 0.5)" }} />
					</Button>
				</div>
			)}
		</Menu>
	);

	return (
		<AppBar
			// position="static"
			className="header-appbar"
			position="sticky"
		>
			<Toolbar>
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="open drawer"
					className="header-menu-icon"
				>
					<MenuIcon />
				</IconButton>

				<Search
					style={{
						flex: 1,
						width: "100%",
					}}
				>
					<SearchIconWrapper>
						<SearchIcon sx={{ color: "#222222" }} />
					</SearchIconWrapper>
					<StyledInputBase
						sx={{
							color: "#222222",
							width: "100%",
							fontFamily: "Inter",
						}}
						placeholder="Search…"
						inputProps={{ "aria-label": "search" }}
					/>
				</Search>
				<Box
					className="header-auth-button-container"
					display={{ xs: "none", md: "flex" }}
				>
					{!isLoggedIn ? (
						<div className="header-auth-buttons">
							<Button className="login-button" onClick={handleLoginDialog}>
								<Typography variant="h4">Login</Typography>
							</Button>
							<LoginDialog
								open={loginDialog}
								handleClose={handleLoginDialogClose}
							/>
							<Button
								variant="contained"
								className="signup-button"
								onClick={handleSignUpDialog}
							>
								<Typography variant="h4">Sign up</Typography>
							</Button>
							<SignUpDialog
								open={signUpDialog}
								handleClose={handleSignUpDialogClose}
							/>
						</div>
					) : (
						<div className="header-auth-buttons logged-in">
							<IconButton>
								<AccountCircleIcon className="account-icon" />
							</IconButton>
							<ContributeButton
								handleClick={() => {
									navigate("/contribute");
								}}
							/>
							<Button className="logout-button" onClick={handleLogout}>
								<Typography variant="h4">Logout</Typography>
							</Button>
						</div>
					)}
				</Box>
				<Box display={{ xs: "flex", md: "none" }}>
					<IconButton
						size="large"
						aria-label="show more"
						aria-controls={mobileMenuId}
						aria-haspopup="true"
						onClick={handleMobileMenuOpen}
						sx={{ color: "#222222" }}
					>
						<MoreIcon />
					</IconButton>
				</Box>
				{renderMobileMenu}
				{renderMenu}
			</Toolbar>
		</AppBar>
	);
}
