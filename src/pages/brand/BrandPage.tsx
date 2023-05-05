import BrandAPI from "@api/BrandAPI";
import BrandBannerInfo from "@components/brand/BrandBannerInfo";
import PopularPosts from "@components/brand/PopularPosts";
import ProductList from "@components/brand/ProductList";
import BrandResponse from "@models/brand/BrandResponse";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./BrandPage.css";
export default function BrandPage() {
	const { brandId } = useParams();

	const [brand, setBrand] = useState<BrandResponse | undefined>();

	const itemListRef = useRef<HTMLDivElement>(null);

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

	const handleScrollToItems = () => {
		if (!itemListRef.current) return;
		itemListRef.current.scrollIntoView({
			behavior: "smooth",
			block: "start",
			inline: "nearest",
		});
	};

	return (
		<div className="page-container">
			{brand && (
				<BrandBannerInfo
					handleScrollToItems={handleScrollToItems}
					brand={brand}
				/>
			)}
			{brandId && <PopularPosts brandId={+brandId} />}
			<ProductList ref={itemListRef} products={brand?.items || []} />
		</div>
	);
}
