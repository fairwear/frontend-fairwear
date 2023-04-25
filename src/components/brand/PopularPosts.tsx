import { Typography } from "@mui/material";
import "./BrandComponents.css";
import BrandPostSlider from "./BrandPostSlider";
import BrandPostResponse from "@models/brandpost/BrandPostResponse";
export default function PopularPosts() {
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
	return (
		<div className="post-container">
			<div className="posts-header-container">
				<Typography variant="h1">Popular Posts About The Brand</Typography>
				<Typography variant="body1" className="posts-description">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</Typography>
			</div>
			<div className="posts-container">
				<BrandPostSlider brandPosts={brandPosts} />
			</div>
		</div>
	);
}
