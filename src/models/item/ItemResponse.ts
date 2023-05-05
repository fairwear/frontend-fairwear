interface ItemResponse {
	id: number;
	userId: number;
	name: string;
	image: string;
	brandId: number;
	createdAt: Date;
	updatedAt: Date | null;
	deletedAt: Date | null;
}

export default ItemResponse;
