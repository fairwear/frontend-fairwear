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
import { Typography } from "@mui/material";
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
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "12px",
					marginTop: "64px",
				}}
			>
				<Typography variant="h1">Popular posts</Typography>
				<Typography
					variant="subtitle1"
					style={{
						width: "50%",
					}}
				>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</Typography>
			</div>
			{brand?.posts && brand?.posts.length > 0 && (
				<div
					style={{
						display: "flex",
						justifyContent: "space-evenly",
						alignItems: "flex-start",
						width: "100%",
						padding: "24px",
						flexWrap: "wrap",
						boxSizing: "border-box",
						gap: "72px",
						maxWidth: "1600px",
					}}
				>
					{brand.posts.splice(0, 4).map((post) => (
						<BrandPostComponent isPreview key={post.id} brandPost={post} />
					))}
				</div>
			)}
			{brand?.items && brand?.items.length > 0 && (
				<ProductList ref={itemListRef} products={brand.items} />
			)}
		</div>
	);
}
