import BrandPostToTopicEntry from "@models/brandpost/BrandPostToTopicEntry";
import BrandPostReferenceCreateRequest from "@models/brandpostreference/BrandPostReferenceCreateRequest";

interface BrandPostCreateRequest {
	title: string;
	body: string;
	references: BrandPostReferenceCreateRequest[];
	brandId: number;
	topics: BrandPostToTopicEntry[];
	itemIds: number[];
	createdAt: Date;
}

export default BrandPostCreateRequest;
