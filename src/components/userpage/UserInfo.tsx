import UserInfoResponse from "@models/user/UserInfoResponse";
import { Typography } from "@mui/material";
import fw from "@assets/svg/FW200.svg";

import MovingText from "@components/common/MovingText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./UserPage.css";
interface UserPageProps {
	userInfo: UserInfoResponse | undefined;
}

const UserInfo = (props: UserPageProps) => {
	const { userInfo } = props;

	return (
		<>
			<div>
				<img src={fw} alt="fw" className="logo-image" />
			</div>
			<div
				style={{
					display: "flex",
					width: "80%",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<div>
					<MovingText />
				</div>
			</div>
			<div className="userinfo-page">
				<div className="userpage-info-container">
					<AccountCircleIcon sx={{ fontSize: 100 }} />
					<Typography variant="h2">username: {userInfo?.username}</Typography>
					<Typography variant="h2">email: {userInfo?.email}</Typography>
				</div>
				<div className="trustScore-container">
					<div className="content-container">
						<Typography variant="h2">User Trust Score Is:</Typography>
					</div>
					<div className="content-container">
						<Typography variant="h2">
							{userInfo?.userTrustScore
								? userInfo?.userTrustScore * 100
								: "unknown"}
							%
						</Typography>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserInfo;
