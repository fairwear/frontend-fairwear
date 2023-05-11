import { Button, SvgIcon, Typography } from "@mui/material";
import "./CommonComponents.css";

interface ContributeComponentProps {
	icon: typeof SvgIcon;
	title: string;
	description: string;
	buttonText: string;
	handleClick: () => void;
}

const ContributeComponent = (props: ContributeComponentProps) => {
	const { title, description, buttonText, handleClick } = props;

	return (
		<div className="contribute-component-container">
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

			<Button
				variant="outlined"
				onClick={handleClick}
				className="contribute-component-button"
			>
				<Typography variant="h5">{buttonText}</Typography>
			</Button>
		</div>
	);
};

export default ContributeComponent;
