interface ItemCreateRequest {
	name: string;
	imageUrl: string;
	barcode?: string;
	brandId: number;
	createdAt: Date;
}
export default ItemCreateRequest;
