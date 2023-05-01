import BrandBannerInfo from "@components/brand/BrandBannerInfo";
import "./BrandPage.css";
import Topics from "@components/brand/Topics";
import PopularPosts from "@components/brand/PopularPosts";
import ProductList from "@components/brand/ProductList";
import { useParams } from "react-router-dom";
import BrandAPI from "@api/BrandAPI";
import { useEffect, useState } from "react";
import BrandResponse from "@models/brand/BrandResponse";
export default function BrandPage() {
	const { brandId } = useParams();

	const [brand, setBrand] = useState<BrandResponse | undefined>();

	useEffect(() => {
		getBrand();
	}, []);

	useEffect(() => {
		getBrand();
	}, [brandId]);

	const getBrand = async () => {
		if (!brandId) return;
		let response = await BrandAPI.findById(+brandId);
		setBrand(response);
	};

	return (
		<div className="page-container">
			{brand && <BrandBannerInfo brand={brand} />}
			{brandId && <PopularPosts brandId={+brandId} />}
			<ProductList />
		</div>
	);
}
