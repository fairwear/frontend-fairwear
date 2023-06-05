import { useAppSelector } from "@redux/store/hooks";
import { Navigate } from "react-router-dom";

interface RequireAdminAccessProps {
	isForAdmins: boolean;
	isAdmin?: boolean;
	children: any;
}

const RequireAdminAccess = (props: RequireAdminAccessProps) => {
	const { isForAdmins, children, isAdmin } = props;
	const isUserAdmin = useAppSelector((state) => state.common.userInfo?.isAdmin);
	// If this page does not require admin role, then show page
	// Or if user has admin role and tries to reach admin pages, then show page
	if (!isForAdmins || (isForAdmins && isUserAdmin)) {
		return <>{children}</>;
	}

	return <Navigate to="/" replace />;
};

export default RequireAdminAccess;
