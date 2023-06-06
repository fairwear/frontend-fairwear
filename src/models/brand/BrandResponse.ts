import BrandPostResponse from "@models/brandpost/BrandPostResponse";
import ItemResponse from "@models/item/ItemResponse";
import TopicResponse from "@models/topic/TopicResponse";
import TopicToBrand from "@models/topic/TopicToBrand";

interface BrandResponse {
	id: number;
	name: string;
	description?: string;
	imageUrl: string | null;
	items: ItemResponse[];
	posts: BrandPostResponse[];
	topics: TopicResponse[];
	topicsToBrand: TopicToBrand[];
	createdAt: Date;
	updatedAt: Date | null;
	deletedAt: Date | null;
}

export default BrandResponse;
