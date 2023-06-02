import TopicToBrand from "@models/topic/TopicToBrand";

interface TopicResponse {
	id: number;
	name: string;
	topicId: number | null;
	brands: TopicToBrand[];
}
export default TopicResponse;
