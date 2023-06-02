import BrandResponse from "@models/brand/BrandResponse";
import BrandPostToTopic from "@models/brandpost/BrandPostToTopic";
import BrandPostReferenceResponse from "@models/brandpostreference/BrandPostReferenceResponse";
import ItemResponse from "@models/item/ItemResponse"; // deepscan-disable-line
import UserInfoResponse from "@models/user/UserInfoResponse";
import VoteEnum from "./VoteEnum";
import BrandPostToItem from "@models/brandpost/BrandPostToItem";

interface BrandPostResponse {
	id: number;
	body: string;
	authorId: number;
	title: string;
	brandId: number;
	brand: BrandResponse;
	votes: VoteEnum[];
	topics: BrandPostToTopic[];
	relatedItems: BrandPostToItem[];
	references: BrandPostReferenceResponse[];
	author: UserInfoResponse;
	createdAt: Date;
	deletedAt: Date | null;
}

export default BrandPostResponse;
