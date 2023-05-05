interface BrandPostReferenceResponse {
	id: number;
	title: string;
	postId: number;
	body?: string;
	sourceUrl?: string;
	createdAt: Date;
	updatedAt: Date | null;
	deletedAt: Date | null;
}

export default BrandPostReferenceResponse;
