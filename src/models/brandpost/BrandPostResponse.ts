import BrandResponse from "@models/brand/BrandResponse";
import VoteResponse from "@models/brandpost/VoteResponse";
import BrandPostReferenceResponse from "@models/brandpostreference/BrandPostReferenceResponse";
import ItemResponse from "@models/item/ItemResponse"; // deepscan-disable-line
import TopicResponse from "@models/topic/TopicResponse";

interface BrandPostResponse {
	id: number;
	body: string;
	brandId: number;
	brand: BrandResponse;
	votes: VoteResponse[];
	topics: TopicResponse[];
	relatedItems: ItemResponse[];
	references: BrandPostReferenceResponse[];
	createdAt: Date;
	deletedAt: Date | null;
}

export default BrandPostResponse;
