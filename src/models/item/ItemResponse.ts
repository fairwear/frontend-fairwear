interface ItemResponse {
	id: number;
	name: string;
	barcode?: string;
	imageUrl?: string;
	brandId: number;
	userId: number;
	createdAt: Date;
	updatedAt: Date | null;
	deletedAt: Date | null;
}

export default ItemResponse;
