import BrandPostSlider from "@components/brand/BrandPostSlider";
import BrandPostResponse from "@models/brandpost/BrandPostResponse";
import { Typography } from "@mui/material";

const brandPosts: BrandPostResponse[] = [
	{
		id: 1,
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
		brand: {
			id: 1,
			name: "Brand 1",
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
		},
		createdAt: new Date(),
		deletedAt: null,
		votes: [],
	},
	{
		id: 2,

		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
		brand: {
			id: 2,
			name: "Brand 2",
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
		},
		createdAt: new Date(),
		deletedAt: null,
		votes: [],
	},

	{
		id: 3,

		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
		brand: {
			id: 3,
			name: "Brand 3",
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
		},
		createdAt: new Date(),
		deletedAt: null,
		votes: [],
	},

	{
		id: 4,
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
		brand: {
			id: 4,
			name: "Brand 4",
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
		},
		createdAt: new Date(),
		deletedAt: null,
		votes: [],
	},

	{
		id: 5,
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
		brand: {
			id: 5,
			name: "Brand 5",
			createdAt: new Date(),
			updatedAt: null,
			deletedAt: null,
		},
		createdAt: new Date(),
		deletedAt: null,
		votes: [],
	},
];

const FeaturedPostsSection = () => {
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
