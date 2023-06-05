import BrandPostResponse from "@models/brandpost/BrandPostResponse";
import { Typography } from "@mui/material";
import BrandPostSlider from "../brandpost/BrandPostSlider";
import "./BrandComponents.css";

interface PopularPostsProps {
	posts: BrandPostResponse[];
}

export default function PopularPosts(props: PopularPostsProps) {
	const { posts } = props;

	return (
		<div className="posts-container">
			<div className="posts-header-container">
				<Typography variant="h1">Popular Posts About The Brand</Typography>

				<Typography variant="body1" className="posts-description">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</Typography>
			</div>
			<div className="posts-inner-container">
				<BrandPostSlider brandPosts={posts} />
			</div>
		</div>
	);
}
