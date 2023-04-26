import BrandResponse from "@models/brand/BrandResponse";
import VoteEnum from "@models/brandpost/VoteEnum";
import ItemResponse from "@models/item/ItemResponse"; // deepscan-disable-line

interface BrandPostResponse {
	id: number;
	body: string;
	createdAt: Date;
	deletedAt: Date | null;
	brand: BrandResponse;
	// item: ItemResponse;
	votes: VoteEnum[];
}

export default BrandPostResponse;
