import BrandPostAPI from "@api/BrandPostAPI";
import BrandPostSlider from "@components/brandpost/BrandPostSlider";
import BrandPostResponse from "@models/brandpost/BrandPostResponse";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

const FeaturedPostsSection = () => {
	const [brandPosts, setBrandPosts] = useState<BrandPostResponse[]>([]);

	useEffect(() => {
		getBrandPosts();
	}, []);

	const getBrandPosts = async () => {
		// TODO: Temp solution, Fix this
		const response = await BrandPostAPI.findAll();
		setBrandPosts(response);
	};

	return (
		<div className="featured-posts-section-container">
			<div className="featured-posts-section-title-container">
				<Typography variant="h1">Featured Posts</Typography>
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
			<BrandPostSlider brandPosts={brandPosts} />
		</div>
	);
};

export default FeaturedPostsSection;
