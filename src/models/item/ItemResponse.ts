import BrandResponse from "@models/brand/BrandResponse";

interface ItemResponse {
    id: number;
    userId: number;
    name: string;
    image: string;
    brandId: BrandResponse;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}

export default ItemResponse;