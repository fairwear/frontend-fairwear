import BrandAPI from "@api/BrandAPI";
import BrandPostAPI from "@api/BrandPostAPI";
import BrandBannerInfo from "@components/brand/BrandBannerInfo";
import ProductList from "@components/brand/ProductList";
import BrandPostComponent from "@components/brandpost/BrandPost";
import BrandResponse from "@models/brand/BrandResponse";
import BrandPostResponse from "@models/brandpost/BrandPostResponse";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./BrandPage.css";
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
		// getPostsByBrandId();
	}, [brandId]);

	const getBrand = async () => {
		if (!brandId) return;
		let response = await BrandAPI.findById(+brandId);
		setBrand(response);
	};
	// const getPostsByBrandId = async () => {
	// 	if (!brandId) return;
	// 	let response = await BrandPostAPI.findAllByBrandId(+brandId);
	// 	setPosts(response);
	// };

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
			{brand?.posts && brand?.posts.length > 0 && (
				<div>
					{posts.splice(0, 3).map((post) => (
						<BrandPostComponent key={post.id} brandPost={post} />
					))}
				</div>
			)}
			{brand?.items && brand?.items.length > 0 && (
				<ProductList ref={itemListRef} products={brand.items} />
			)}
		</div>
	);
}
