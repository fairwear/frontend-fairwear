import { Typography } from "@mui/material";
import "./BrandComponents.css";
import TopicResponse from "@models/topic/TopicResponse";
import TopicViewComponent from "@components/topic/TopicViewComponent";
import TopicToBrand from "@models/topic/TopicToBrand";

interface TopicProps {
	topics: TopicResponse[];
	topicsToBrands?: TopicToBrand[];
}

export default function Topics(props: TopicProps) {
	const { topics, topicsToBrands } = props;

	return (
		<div className="topic-component">
			<div className="topic-section-header-container">
				<Typography className="topic-section-header" variant="h3">
					Topics
				</Typography>
				<Typography
					variant="body1"
					className="topic-section-description"
				></Typography>
			</div>
			<div className="topic-container">
				{!topicsToBrands &&
					topics.map((topic) => (
						<div key={topic.id} className="topic">
							<Typography variant="body1" className="topic-name">
								{topic.name}
							</Typography>
						</div>
					))}

				{topicsToBrands &&
					topicsToBrands.map((topicToBrand) => (
						<TopicViewComponent
							key={topicToBrand.topicId - topicToBrand.brandId}
							topicToBrand={topicToBrand}
						/>
					))}
			</div>
		</div>
	);
}
