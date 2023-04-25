import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import MarkunreadMailboxOutlinedIcon from "@mui/icons-material/MarkunreadMailboxOutlined";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import PaymentIcon from "@mui/icons-material/Payment";
import { Chip, ChipProps, Typography } from "@mui/material";
import "./AlertComponents.css";

interface TagComponentProps extends ChipProps {
	type: "success" | "error" | "info" | "default" | "warning";
	tag: "noIcon" | "hasIcon";
}

const TagComponent = (props: TagComponentProps) => {
	const { type, tag = "hasIcon", ...other } = props;
	return (
		<Chip
			color={type}
			icon={getChipIcon(type, tag)}
			{...other}
			label={
				<Typography
					variant="subtitle1"
					color={type === "info" || type === "warning" ? "#171440" : "#FFFFFF"}
				>
					{other.label}
				</Typography>
			}
		/>
	);
};

const getChipIcon = (
	type: TagComponentProps["type"],
	tag: TagComponentProps["tag"]
) => {
	if (tag === "noIcon") {
		return undefined;
	}
	switch (type) {
		case "success":
			return (
				<CheckCircleOutlinedIcon
					style={{
						color: "#FFFFFF",
						height: "18px",
						width: "18px",
						marginRight: "-8px",
						marginLeft: "12px",
					}}
				/>
			);
		case "warning":
			return (
				<PaymentIcon
					style={{
						color: "#171440",
						height: "18px",
						width: "18px",
						marginRight: "-8px",
						marginLeft: "12px",
					}}
				/>
			);
		case "error":
			return (
				<NotInterestedIcon
					style={{
						color: "#FFFFFF",
						height: "18px",
						width: "18px",
						marginRight: "-8px",
						marginLeft: "12px",
					}}
				/>
			);
		case "info":
			return (
				<MarkunreadMailboxOutlinedIcon
					style={{
						color: "#171440",
						height: "18px",
						width: "18px",
						marginRight: "-8px",
						marginLeft: "12px",
					}}
				/>
			);
	}
};

export default TagComponent;
