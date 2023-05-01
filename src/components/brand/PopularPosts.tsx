import BrandPostAPI from "@api/BrandPostAPI";
import BrandPostResponse from "@models/brandpost/BrandPostResponse";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import BrandPostSlider from "../brandpost/BrandPostSlider";
import "./BrandComponents.css";

interface PopularPostsProps {
	brandId: number;
}

export default function PopularPosts(props: PopularPostsProps) {
	// TODO: Implement this, currently not used
	// const { brandId } = props;

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
		<div className="posts-container">
			<div className="posts-header-container">
				<Typography variant="h1" >Popular Posts About The Brand</Typography>
				
				<Typography variant="body1" className="posts-description">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</Typography>
			</div>
			<div className="posts-inner-container">
				<BrandPostSlider brandPosts={brandPosts} />
			</div>
		</div>
	);
}
