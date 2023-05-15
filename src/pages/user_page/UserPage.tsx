import UserAPI from "@api/UserInfoAPI";
import UserInfo from "@components/userpage/UserInfo";
import UserInfoResponse from "@models/user/UserInfoResponse";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserPage = () => {
	const { username } = useParams<{ username: string }>();

	const [userinfo, setUser] = useState<UserInfoResponse | undefined>();


	const getUser = async () => {
		if (!username) return;
		const user = await UserAPI.findByUsername(username);
		setUser(user);
		
	};

	useEffect(() => {
		getUser();
	}, [username]);


	return (
		<div >
			<UserInfo userInfo={userinfo} />
		</div>
	);
}

export default UserPage;