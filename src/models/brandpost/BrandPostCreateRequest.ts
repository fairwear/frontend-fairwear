import BrandPostToTopicEntry from "@models/brandpost/BrandPostToTopicEntry";

interface BrandPostCreateRequest {
	title: string;
	body: string;
	sourceUrls: string[];
	brandId: number;
	topics: BrandPostToTopicEntry[];
	itemIds: number[];
	createdAt: Date;
}

export default BrandPostCreateRequest;
