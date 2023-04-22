import VoteEnum from "@models/brandpost/VoteEnum";

interface BrandPostResponse {
	id: number;

	body: string;

	createdAt: Date;

	deletedAt: Date | null;

	votes: VoteEnum[];
}

export default BrandPostResponse;
