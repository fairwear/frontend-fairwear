interface BrandResponse {
	id: number;
	name: string;
	createdAt: Date;
	updatedAt: Date | null;
	deletedAt: Date | null;
}

export default BrandResponse;
