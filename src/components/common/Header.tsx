import AuthAPI from "@api/AuthAPI";
import fw from "@assets/svg/FW200.svg";
import SearchField from "@components/common/SearchField";
import LoginDialog from "@components/login/LoginDialog";
import SignUpDialog from "@components/login/SignUpDialog";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Button, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import { useAppSelector } from "@redux/store/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Components.css";
import "./CommonComponents.css";
import ContributeButton from "./ContributeButton";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import ItemScannerDialog from "@components/scanner/ItemScannerDialog";
import { AlertValue } from "@redux/store/alert/AlertState";
import alerts from "@redux/alerts";

export default function PrimarySearchAppBar() {
	const [loginDialog, setLoginDialog] = useState(false);
	const [signUpDialog, setSignUpDialog] = useState(false);
	const [barcodeScannerDialogOpen, setBarcodeScannerDialogOpen] =
		useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
		useState<null | HTMLElement>(null);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [hasPermission, setHasPermission] = useState<boolean>(false);
	const [mediaStream, setMediaStream] = useState<MediaStream | undefined>();

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

	const handleBarcodeScannerOpen = async () => {
		setBarcodeScannerDialogOpen(true);
		await handleAskCameraPermission();
		setTimeout(() => {
			setIsLoaded(true);
		}, 150);
	};

	const handleBarcodeScannerClose = () => {
		mediaStream?.getVideoTracks()[0].stop();
		setTimeout(() => {
			setIsLoaded(false);
		}, 150);
	};

	const handleBarcodeDialogClose = () => {
		setBarcodeScannerDialogOpen(false);
		mediaStream?.getVideoTracks()[0].stop();
		setTimeout(() => {
			setIsLoaded(false);
		}, 150);
	};

	const handleAskCameraPermission = async () => {
		try {
			const mediaStream: MediaStream =
				await navigator.mediaDevices.getUserMedia({
					video: true,
				});
			setHasPermission(true);
			setMediaStream(mediaStream);

			return mediaStream;
		} catch (error: any) {
			handlePermissionError();
			setHasPermission(false);
			setMediaStream(undefined);

			throw error;
		}
	};

	const handlePermissionError = () => {
		const permissionAlert: AlertValue = {
			isOpen: true,
			message: "Please allow camera access to be able to scan barcodes.",
			alertSeverity: "error",
			alertType: "toast",
		};
		alerts.addAlert(permissionAlert);
	};

	// TODO: Export this to a separate component
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

	// TODO: Export this to a separate component
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
			className="header-app-bar"
			position="sticky"
		>
			<Toolbar>
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="open drawer"
					className="header-menu-icon"
					sx={{
						"&:hover": {
							backgroundColor: "transparent",
						},
					}}
					onClick={() => navigate("/")}
				>
					<img width="100px" src={fw} />
				</IconButton>

				{/* <Search
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
				</Search> */}
				<SearchField />
				<IconButton onClick={handleBarcodeScannerOpen}>
					<CameraAltRoundedIcon />
				</IconButton>
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
			<ItemScannerDialog
				open={barcodeScannerDialogOpen}
				hasPermission={hasPermission}
				handleAskCameraPermission={handleAskCameraPermission}
				handleScannerClose={handleBarcodeScannerClose}
				handleClose={handleBarcodeDialogClose}
				isLoaded={isLoaded}
			/>
		</AppBar>
	);
}
