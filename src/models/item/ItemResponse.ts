import BrandResponse from "@models/brand/BrandResponse";

interface ItemResponse {
	id: number;
	name: string;
	barcode?: string;
	imageUrl?: string;
	brandId: BrandResponse;
	userId: number;
	createdAt: Date;
	updatedAt: Date | null;
	deletedAt: Date | null;
}

export default ItemResponse;
