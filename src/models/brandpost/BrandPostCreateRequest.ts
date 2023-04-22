import BrandPostToTopicEntry from "@models/brandpost/BrandPostToTopicEntry";

interface BrandPostCreateRequest {
	body: string;
	brandId: number;
	topics: BrandPostToTopicEntry[];
	itemIds: number[];
}

export default BrandPostCreateRequest;