import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import { alpha, styled } from "@mui/material/styles";
import * as React from "react";
import LoginDialog from "@components/login/LoginDialog";
import SignUpDialog from "@components/login/SignUpDialog";
import "../Components.css";

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
	width: "90%",
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
		console.log("Login Dialog Closed");
	};

	const handleSignUpDialog = () => {
		setSignUpDialog(true);
	};
	const handleSignUpDialogClose = () => {
		setSignUpDialog(false);
		console.log("Sign Up Dialog Closed");
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
			onClose={handleMenuClose}>
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
			onClose={handleMobileMenuClose}>
			{/* <MenuItem onClick={handleProfileMenuOpen}> */}
			<Button onClick={handleLoginDialog}>
				<h2 className='header-text'>Log in</h2>
			</Button>
			{/* </MenuItem> */}
			{/* <MenuItem onClick={handleProfileMenuOpen}> */}
			<Button onClick={handleSignUpDialog}>
				<h2 className='header-text'>Sign Up</h2>
			</Button>
			{/* </MenuItem> */}
		</Menu>
	);

	return (
		<Box>
			<AppBar sx={{ boxShadow: "none" }}>
				<Toolbar sx={{ backgroundColor: "#e9e9e9" }}>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='open drawer'
						sx={{
							color: "#222222",
							mr: 2,
						}}>
						<MenuIcon />
					</IconButton>

					<Search>
						<SearchIconWrapper>
							<SearchIcon sx={{ color: "#222222" }} />
						</SearchIconWrapper>
						<StyledInputBase
							sx={{
								color: "#222222",
								width: "100%",
								fontFamily: "Inter",
							}}
							placeholder='Search…'
							inputProps={{ "aria-label": "search" }}
						/>
					</Search>
					<Box sx={{ flexGrow: 1 }} />
					<Box
						sx={{
							display: { xs: "none", md: "flex" },
							flexDirection: "row",
							justifyContent: "space-evenly",
							width: "20%",
							marginRight: "16px",
						}}>
						<Button onClick={handleLoginDialog}>
							<h2 className='header-text'>Login</h2>
						</Button>
						<LoginDialog
							toSignUp={handleSignUpDialog}
							open={loginDialog}
							handleClose={handleLoginDialogClose}
						/>
						<Button onClick={handleSignUpDialog}>
							<h2 className='header-text'>Sign Up</h2>
						</Button>
						<SignUpDialog
							toLogin={handleLoginDialog}
							open={signUpDialog}
							handleClose={handleSignUpDialogClose}
						/>
					</Box>
					<Box sx={{ display: { xs: "flex", md: "none" } }}>
						<IconButton
							size='large'
							aria-label='show more'
							aria-controls={mobileMenuId}
							aria-haspopup='true'
							onClick={handleMobileMenuOpen}
							sx={{ color: "#222222" }}>
							<MoreIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</Box>
	);
}
