interface BrandPost {
	id: number;
	title: string;
	body: string;
	brandId: number;
	authorId: number;
	postScore: number;
	createdAt: Date;
	deletedAt?: Date;
	sourceUrls?: string[];
}

export default BrandPost;
