import BrandResponse from "@models/brand/BrandResponse";
import VoteEnum from "@models/brandpost/VoteEnum";

interface BrandPostResponse {
	id: number;
	body: string;
	createdAt: Date;
	deletedAt: Date | null;
	brand: BrandResponse;
	votes: VoteEnum[];
}

export default BrandPostResponse;
