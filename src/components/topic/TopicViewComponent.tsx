import TopicAPI from "@api/TopicAPI";
import BrandPostToTopic from "@models/brandpost/BrandPostToTopic";
import TopicResponse from "@models/topic/TopicResponse";
import { CancelRounded, CheckCircleOutlineRounded } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AppTheme from "../../AppTheme";
import "./Topic.css";
import TopicToBrand from "@models/topic/TopicToBrand";

interface TopicViewComponentProps {
	postToTopic?: BrandPostToTopic;
	topicToBrand?: TopicToBrand;
	containerStyle?: React.CSSProperties;
}

const TopicViewComponent = (props: TopicViewComponentProps) => {
	const { postToTopic, topicToBrand } = props;
	const [topic, setTopic] = useState<TopicResponse | undefined>();

	useEffect(() => {
		getTopic();
	}, []);

	const getTopic = async () => {
		if (topicToBrand) {
			const response = await TopicAPI.findById(topicToBrand.topicId);
			setTopic(response);
		} else if (postToTopic) {
			const response = await TopicAPI.findById(postToTopic.topicId);
			setTopic(response);
		}
	};

	return (
		<div
			className="topic-view-component-outer-container"
			style={props.containerStyle}
		>
			<div className="topic-view-component-container">
				<div className="topic-name">
					<Typography
						variant="h5"
						fontWeight={700}
						fontSize={16}
						className="topic-name-text"
					>
						{topic?.name}
					</Typography>
				</div>
				<div className="topic-rating">
					{topicToBrand
						? getTopicScore(topicToBrand.score)
						: postToTopic
						? getTopicIcon(postToTopic.isBad)
						: null}
				</div>
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

const getTopicScore = (score: number) => {
	return (
		<div className="topic-score">
			<Typography
				variant="h5"
				className="topic-score-text"
				fontWeight={700}
				fontSize={16}
				style={{
					color:
						score >= 8
							? "rgba(56, 142, 60, 1)"
							: score >= 5
							? "rgba(255, 193, 7, 1)"
							: "rgba(211, 47, 47, 1)",
				}}
			>
				{score}/10
			</Typography>
		</div>
	);
};

export default TopicViewComponent;
