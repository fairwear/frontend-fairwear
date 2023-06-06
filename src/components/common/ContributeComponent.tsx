import { Button, SvgIcon, Tooltip, Typography } from "@mui/material";
import "./CommonComponents.css";
import { useAppSelector } from "@redux/store/hooks";

interface ContributeComponentProps {
	icon: typeof SvgIcon;
	title: string;
	description: string;
	buttonText: string;
	handleClick: () => void;
	containerStyle?: React.CSSProperties;
}

const ContributeComponent = (props: ContributeComponentProps) => {
	const { title, description, buttonText, handleClick } = props;

	const isUserLoggedIn = useAppSelector((state) => state.common.isLoggedIn);

	return (
		<div
			className="contribute-component-container"
			style={{
				...props.containerStyle,
			}}
		>
			<div className="contribute-component-icon-container">
				<SvgIcon
					style={{
						width: "64px",
						height: "64px",
						color: "rgba(0, 0, 0, 0.74)",
					}}
					component={props.icon}
				/>
			</div>
			<div className="contribute-component-content">
				<Typography variant="h4">{title}</Typography>
				<Typography variant="body1">{description}</Typography>
			</div>

			<Tooltip
				title={isUserLoggedIn ? "" : "Please log in order to contribute"}
			>
				<div>
					<Button
						variant="outlined"
						disabled={!isUserLoggedIn}
						onClick={handleClick}
						className="contribute-component-button"
					>
						<Typography variant="h5">{buttonText}</Typography>
					</Button>
				</div>
			</Tooltip>
		</div>
	);
};

export default ContributeComponent;
