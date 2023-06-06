import BrandPostAPI from "@api/BrandPostAPI";
import BrandPostComponent from "@components/brandpost/BrandPost";
import BrandPostResponse from "@models/brandpost/BrandPostResponse";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

const FeaturedPostsSection = () => {
	const [brandPosts, setBrandPosts] = useState<BrandPostResponse[]>([]);
	const [activeStep, setActiveStep] = useState<number>(0);
	const [autoPlay, setAutoPlay] = useState<boolean>(true);

	useEffect(() => {
		getBrandPosts();
	}, []);

	const getBrandPosts = async () => {
		const response = await BrandPostAPI.findAll();
		console.log(response);
		setBrandPosts(response);
	};

	return (
		<>
			{brandPosts.length > 0 && (
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

					<div
						style={{
							width: "100%",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<div
							style={{
								display: "flex",
								flexWrap: "wrap",

								justifyContent: "space-evenly",
								alignItems: "center",

								boxSizing: "border-box",
								padding: "24px",
								width: "100%",
								maxWidth: "1400px",
								gap: "72px",
							}}
						>
							{brandPosts.splice(0, 4).map((brandPost, index) => (
								<div
									key={brandPost.id}
									style={{
										flex: "0 0 45%",
									}}
								>
									<BrandPostComponent isPreview brandPost={brandPost} />
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default FeaturedPostsSection;
