import BrandAPI from "@api/BrandAPI";
import BrandBannerInfo from "@components/brand/BrandBannerInfo";
import PopularPosts from "@components/brand/PopularPosts";
import ProductList from "@components/brand/ProductList";
import BrandResponse from "@models/brand/BrandResponse";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./BrandPage.css";
import BrandPostResponse from "@models/brandpost/BrandPostResponse";
import BrandPostAPI from "@api/BrandPostAPI";
export default function BrandPage() {
	const { brandId } = useParams();

	const [brand, setBrand] = useState<BrandResponse | undefined>();
	const [posts, setPosts] = useState<BrandPostResponse[]>([]);

	const itemListRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		getBrand();
	}, []);

	useEffect(() => {
		getBrand();
		getPostsByBrandId();
	}, [brandId]);

	const getBrand = async () => {
		if (!brandId) return;
		let response = await BrandAPI.findById(+brandId);
		setBrand(response);
	};
	const getPostsByBrandId = async () => {
		if (!brandId) return;
		let response = await BrandPostAPI.findAllByBrandId(+brandId);
		setPosts(response);
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
			{posts.length > 0 && <PopularPosts posts={posts} />}
			{brand?.items && brand?.items.length > 0 && (
				<ProductList ref={itemListRef} products={brand?.items || []} />
			)}
		</div>
	);
}
