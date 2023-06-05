import { Typography } from "@mui/material";
import "./BrandComponents.css";
import TopicResponse from "@models/topic/TopicResponse";

export default function Topics() {
	const topics: TopicResponse[] = [
		{
			id: 1,
			name: "Topic 1",
			topicId: 1,
			brands: [],
			createdAt: new Date(),
		},
		{
			id: 2,
			name: "Topic 2",
			topicId: 2,
			brands: [],
			createdAt: new Date(),
		},
		{
			id: 3,
			name: "Topic 3",
			topicId: 3,
			brands: [],
			createdAt: new Date(),
		},
		{
			id: 4,
			name: "Topic 4",
			topicId: 4,
			brands: [],
			createdAt: new Date(),
		},
	];

	return (
		<div className="topic-component">
			<div className="topic-section-header-container">
				<Typography className="topic-section-header" variant="h1">
					Topics
				</Typography>
				<Typography variant="body1" className="topic-section-description">
					dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
					incididunt ut labore et dolore magna aliqua. Faucibus ornare
					suspendisse sed nisi lacus sed viverra. Vitae justo eget magna
					fermentum iaculis eu.{" "}
				</Typography>
			</div>
			<div className="topic-container">
				{topics.map((topic) => (
					<div key={topic.id} className="topic">
						<Typography variant="body1" className="topic-name">
							{topic.name}
						</Typography>
					</div>
				))}
			</div>
		</div>
	);
}
