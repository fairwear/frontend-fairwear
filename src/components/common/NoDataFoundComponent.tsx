import NothingFound from "@assets/svg/undraw_empty.svg";
import { Typography } from "@mui/material";
import AppTheme from "../../AppTheme";
import "./CommonComponents.css";

interface NoDataFoundComponentProps {
	title?: string;
	message?: string;
	subMessage?: string;
	handleAddNew?: () => void;
}

const NoDataFoundComponent = (props: NoDataFoundComponentProps) => {
	const {
		title = "No Data was Found",
		message = "Try changing the filtering options or try to again later",
		subMessage = "",
	} = props;
	return (
		<div className="no-data-main-container">
			<div className={"no-data-picture"}>
				<img
					src={NothingFound}
					style={{
						width: "100%",
						minWidth: "80px",
						maxWidth: "400px",
					}}
				/>
			</div>
			<div className="no-data-text">
				<Typography variant={"h2"} color={AppTheme.palette.text.primary}>
					{title}
				</Typography>
				<Typography variant="h4" color={AppTheme.palette.text.primary}>
					{message}
				</Typography>
				{subMessage && (
					<Typography variant="body1" color={AppTheme.palette.text.secondary}>
						{subMessage}
					</Typography>
				)}
			</div>
			<div className="one-flex"></div>
		</div>
	);
};

export default NoDataFoundComponent;
