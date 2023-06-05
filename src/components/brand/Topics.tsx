import { Typography } from "@mui/material";
import "./BrandComponents.css";
import TopicResponse from "@models/topic/TopicResponse";

interface TopicProps {
	topics: TopicResponse[];
}

export default function Topics(props: TopicProps) {
	const { topics } = props;

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
