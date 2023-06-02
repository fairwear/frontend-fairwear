import AuthAPI from "@api/AuthAPI";
import fw from "@assets/svg/FW200.svg";
import HeaderMenu from "@components/common/HeaderMenu";
import SearchField from "@components/common/SearchField";
import LoginDialog from "@components/login/LoginDialog";
import SignUpDialog from "@components/login/SignUpDialog";
import ItemScannerDialog from "@components/scanner/ItemScannerDialog";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Button, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import alerts from "@redux/alerts";
import { AlertValue } from "@redux/store/alert/AlertState";
import { useAppSelector } from "@redux/store/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Components.css";
import "./CommonComponents.css";
import ContributeButton from "./ContributeButton";

const maxWidthForLogo = 600;

export default function PrimarySearchAppBar() {
	const [width, setWidth] = useState<number>(window.innerWidth);
	const [loginDialogOpen, setLoginDialogOpen] = useState(false);
	const [signupDialogOpen, setSignupDialogOpen] = useState(false);
	const [barcodeScannerDialogOpen, setBarcodeScannerDialogOpen] =
		useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [hasPermission, setHasPermission] = useState<boolean>(false);
	const [mediaStream, setMediaStream] = useState<MediaStream | undefined>();

	const isMenuOpen = Boolean(anchorEl);

	window.addEventListener("resize", () => {
		setWidth(window.innerWidth);
	});

	const handleLogout = async () => {
		await AuthAPI.logout();
		window.location.reload();
	};

	const navigate = useNavigate();

	const isLoggedIn = useAppSelector((state) => state.common.isLoggedIn);

	const handleLoginDialogOpen = () => {
		setLoginDialogOpen(true);
	};

	const handleLoginDialogClose = () => {
		setLoginDialogOpen(false);
	};

	const handleSignupDialogOpen = () => {
		setSignupDialogOpen(true);
	};
	const handleSignupDialogClose = () => {
		setSignupDialogOpen(false);
	};

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
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

	return (
		<AppBar
			// position="static"
			className="header-appbar"
			position="sticky"
		>
			<Toolbar>
				{width > maxWidthForLogo && (
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
				)}
				<SearchField />
				<IconButton
					onClick={handleBarcodeScannerOpen}
					style={{
						margin: "0 10px",
					}}
				>
					<CameraAltRoundedIcon className="header-camera-icon" />
				</IconButton>
				<Box
					className="header-auth-button-container"
					display={{ xs: "none", md: "flex" }}
				>
					{!isLoggedIn ? (
						<div className="header-auth-buttons">
							<Button className="login-button" onClick={handleLoginDialogOpen}>
								<Typography variant="h4">Login</Typography>
							</Button>
							<LoginDialog
								open={loginDialogOpen}
								handleClose={handleLoginDialogClose}
							/>
							<Button
								variant="contained"
								className="signup-button"
								onClick={handleSignupDialogOpen}
							>
								<Typography variant="h4">Sign up</Typography>
							</Button>
							<SignUpDialog
								open={signupDialogOpen}
								handleClose={handleSignupDialogClose}
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
				{!isLoggedIn && (
					<Box display={{ xs: "flex", md: "none" }}>
						<IconButton
							size="large"
							aria-haspopup="true"
							onClick={handleMenuOpen}
							sx={{ color: "#222222" }}
						>
							<MoreIcon />
						</IconButton>
					</Box>
				)}
				{isLoggedIn && (
					<IconButton onClick={handleMenuOpen}>
						<AccountCircleIcon className="account-icon" />
					</IconButton>
				)}
			</Toolbar>
			<HeaderMenu
				open={isMenuOpen}
				anchorEl={anchorEl}
				handleClose={handleMenuClose}
				handleLogout={handleLogout}
				loginDialogOpen={loginDialogOpen}
				handleLoginDialogOpen={handleLoginDialogOpen}
				handleLoginDialogClose={handleLoginDialogClose}
				signupDialogOpen={signupDialogOpen}
				handleSignupDialogOpen={handleSignupDialogOpen}
				handleSignupDialogClose={handleSignupDialogClose}
			/>
			<ItemScannerDialog
				open={barcodeScannerDialogOpen}
				hasPermission={hasPermission}
				handleAskCameraPermission={handleAskCameraPermission}
				handleScannerOpen={handleBarcodeScannerOpen}
				handleScannerClose={handleBarcodeScannerClose}
				handleClose={handleBarcodeDialogClose}
				isLoaded={isLoaded}
			/>
		</AppBar>
	);
}
