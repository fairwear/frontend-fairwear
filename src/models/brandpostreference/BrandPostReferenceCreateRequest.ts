interface BrandPostReferenceCreateRequest {
	id: number;
	title: string;
	postId: number;
	body: string;
	sourceUrl: string;
	createdAt: Date;
}

export default BrandPostReferenceCreateRequest;
