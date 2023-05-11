interface ItemUpdateRequest {
	id: number;
	name: string;
	imageUrl?: string;
	barcode?: string;
	brandId: number;
	updatedAt: Date;
}

export default ItemUpdateRequest;
