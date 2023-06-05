import TopicAPI from "@api/TopicAPI";
import BrandPostToTopic from "@models/brandpost/BrandPostToTopic";
import TopicResponse from "@models/topic/TopicResponse";
import { CancelRounded, CheckCircleOutlineRounded } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AppTheme from "../../AppTheme";
import "./Topic.css";

interface TopicViewComponentProps {
	postToTopic: BrandPostToTopic;
	containerStyle?: React.CSSProperties;
}

const TopicViewComponent = (props: TopicViewComponentProps) => {
	const { postToTopic } = props;
	const [topic, setTopic] = useState<TopicResponse | undefined>();

	useEffect(() => {
		getTopic();
	}, []);

	const getTopic = async () => {
		const response = await TopicAPI.findById(postToTopic.topicId);
		setTopic(response);
	};

	return (
		<div
			className="topic-view-component-outer-container"
			style={props.containerStyle}
		>
			<div className="topic-view-component-container">
				<div className="topic-name">
					<Typography variant="body1" className="topic-name-text">
						{topic?.name}
					</Typography>
				</div>
				<div className="topic-rating">{getTopicIcon(postToTopic.isBad)}</div>
			</div>
		</div>
	);
};

const getTopicIcon = (isBad: boolean) => {
	if (isBad) {
		return (
			<CancelRounded
				style={{
					height: "28px !important",
					width: "28px !important",
					color: AppTheme.palette.red[400],
				}}
				className="rating-icon"
			/>
		);
	} else {
		return (
			<CheckCircleOutlineRounded
				style={{
					height: "28px !important",
					width: "28px !important",
					color: AppTheme.palette.green[400],
				}}
				className="rating-icon"
			/>
		);
	}
};

export default TopicViewComponent;
