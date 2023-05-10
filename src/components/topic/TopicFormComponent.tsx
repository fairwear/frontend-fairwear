import BrandPostToTopicEntry from "@models/brandpost/BrandPostToTopicEntry";
import TopicResponse from "@models/topic/TopicResponse";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { IconButton, Typography } from "@mui/material";
import { useState } from "react";
import AppTheme from "../../AppTheme";
import "./Topic.css";

interface TopicFormComponentProps {
	name: string;
	topic: TopicResponse;
	handleDeleteTopic: (topicId: number) => void;
	handleTopicChange: (newValue: BrandPostToTopicEntry) => void;
}

const TopicFormComponent = (props: TopicFormComponentProps) => {
	const { topic, handleDeleteTopic, handleTopicChange } = props;

	const [isTopicBad, setIsTopicBad] = useState<boolean>(false);

	const handleTopicSwitch = () => {
		setIsTopicBad(!isTopicBad);
		const newValue: BrandPostToTopicEntry = {
			topicId: topic.id,
			isBad: !isTopicBad,
		};
		handleTopicChange(newValue);
	};

	return (
		<div className="topic-form-component-outer-container">
			<div className="topic-form-component-container">
				<div className="topic-name">
					<Typography variant="body1" className="topic-name-text">
						{topic.name}
					</Typography>
				</div>
				<div className="topic-rating">
					<IconButton
						onClick={handleTopicSwitch}
						className="topic-rating-button"
					>
						{isTopicBad ? (
							<CancelRoundedIcon
								style={{ color: AppTheme.palette.red[400] }}
								className="cancel-icon"
							/>
						) : (
							<CheckCircleOutlineRoundedIcon
								style={{ color: AppTheme.palette.green[400] }}
								className="check-icon"
							/>
						)}
					</IconButton>
				</div>
			</div>
			<IconButton
				onClick={() => handleDeleteTopic(topic.id)}
				className="topic-delete-button"
			>
				<DeleteForeverRoundedIcon
					style={{ color: AppTheme.palette.red[200] }}
				/>
			</IconButton>
		</div>
	);
};

export default TopicFormComponent;
