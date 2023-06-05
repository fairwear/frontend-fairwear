import BrandPostAPI from "@api/BrandPostAPI";
import BrandPostComponent from "@components/brandpost/BrandPost";

import BrandPostResponse from "@models/brandpost/BrandPostResponse";
import { Typography } from "@mui/material";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { useEffect, useRef, useState } from "react";

const getWindowDimensions: any = () => {
	const { innerWidth: width } = window;
	return {
		width,
	};
};

const FeaturedPostsSection = () => {
	const [brandPosts, setBrandPosts] = useState<BrandPostResponse[]>([]);
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);
	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	useEffect(() => {
		getBrandPosts();
	}, []);

	const getBrandPosts = async () => {
		const response = await BrandPostAPI.findAll();
		setBrandPosts(response);
	};

	const slideRef = useRef<any | null>(null);

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
			{brandPosts.length > 0 && (
				<Splide
					ref={slideRef}
					hasTrack={false}
					options={{
						arrows: false,
						perPage: 1,
						rewind: false,
						direction: "ltr",
						gap: 24,
						pagination: false,
					}}
					style={{
						maxHeight: 1000,
						overflowY: "scroll",
					}}
				>
					<SplideTrack
						style={{
							overflowY: "scroll",
						}}
					>
						{brandPosts.splice(0, 3).map((brandPost) => {
							return (
								<SplideSlide key={brandPost.id}>
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											alignContent: "center",
											alignItems: "center",
										}}
									>
										<BrandPostComponent
											key={brandPost.id}
											brandPost={brandPost}
										/>
									</div>
								</SplideSlide>
							);
						})}
					</SplideTrack>
				</Splide>
			)}
		</div>
	);
};

export default FeaturedPostsSection;
