import BrandResponse from "@models/brand/BrandResponse";
import BrandPostToItem from "@models/brandpost/BrandPostToItem";
import BrandPostToTopic from "@models/brandpost/BrandPostToTopic";
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
	topics: BrandPostToTopic[];
	relatedItems: BrandPostToItem[];
	sourceUrls: string[];
	author: UserInfoResponse;
	createdAt: Date;
	deletedAt: Date | null;
}

export default BrandPostResponse;
