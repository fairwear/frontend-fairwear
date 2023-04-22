import { Typography } from "@mui/material";

const FeatuedPostsSection = () => {
	return (
		<div className="featured-posts-section-container">
			<div className="featured-posts-section-title-container">
				<Typography variant="h1">Featured Posts</Typography>
				<Typography variant="subtitle1">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</Typography>
			</div>
			<div className="featured-posts-section-posts-container"></div>
		</div>
	);
};

export default FeatuedPostsSection;
