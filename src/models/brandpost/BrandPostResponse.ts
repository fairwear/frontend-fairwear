import BrandResponse from "@models/brand/BrandResponse";
import BrandPostReferenceResponse from "@models/brandpostreference/BrandPostReferenceResponse";
import ItemResponse from "@models/item/ItemResponse"; // deepscan-disable-line
import TopicResponse from "@models/topic/TopicResponse";
import UserInfoResponse from "@models/user/UserInfoResponse";
import VoteEnum from "./VoteEnum";

interface BrandPostResponse {
	id: number;
	body: string;
	authorId: number;
	title: string;
	brandId: number;
	brand: BrandResponse;
	votes: VoteEnum[];
	topics: TopicResponse[];
	relatedItems: ItemResponse[];
	references: BrandPostReferenceResponse[];
	author: UserInfoResponse;
	createdAt: Date;
	deletedAt: Date | null;
}

export default BrandPostResponse;
