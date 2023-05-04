import UserAPI from "@api/UserAPI";
import UserInfoResponse from "@models/user/UserInfoResponse";
import { Email } from "@mui/icons-material";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function UserPage() {
	const [user, setUser] = useState<UserInfoResponse | null>(null);
	const { username } = useParams<{ username: string }>();

	const getUser = async () => {
		if (!username) return;
		const user = await UserAPI.getUserInfo(+username);
		setUser(user);
	};
	getUser();

	return (
		<div>
			<h1>
				{user?.username}
				{user?.email}
			</h1>
		</div>
	);
}
