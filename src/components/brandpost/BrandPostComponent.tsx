import VoteComponent from "@components/brandpost/VoteComponent";
import BrandPostResponse from "@models/brandpost/BrandPostResponse";
import { Typography } from "@mui/material";
import moment from "moment";
import "./BrandPost.css";

interface BrandPostComponentProps {
	brandPost: BrandPostResponse;
}

const BrandPostComponent = (props: BrandPostComponentProps) => {
	const url = props.brandPost.references.map((url) => {
		return url.sourceUrl;
	});

	const getUserName = () => {
		if (props.brandPost.author.name) {
			return props.brandPost.author.name;
		}
		return "Anonymous";
	};

	return (
		<div className="brandpost-container">
			<VoteComponent brandPostId={props.brandPost.id} />
			<div className="brandpost-content-container">
				<div className="brandpost-name-container">
					<Typography align="left" variant="h2">
						{props.brandPost.brand.name}
					</Typography>
				</div>
				<div className="brandpost-desc-container">
					<Typography align="left" variant="h3">
						{props.brandPost.title}
					</Typography>
					<Typography align="left" variant="body1">
						{props.brandPost.body}
						|Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia
						temporibus laboriosam soluta eum! Perspiciatis rerum, reiciendis
						repellendus, fugit dignissimos numquam quasi in ab vel consectetur
						eveniet dolorum consequuntur, error atque. Lorem ipsum dolor, sit
						amet consectetur adipisicing elit. Consectetur ad veniam temporibus!
						Neque iusto error architecto consectetur commodi amet quia
						accusantium, qui iure eos porro deleniti magni cumque voluptatibus
						soluta?
					</Typography>
				</div>
				<div className="brandpost-info-container">
					{url.map((url) => (
						<Typography key={url} variant="subtitle1">
							Reference url:<a href={url}>{url}</a>
						</Typography>
					))}

					<Typography variant="subtitle1">
						{moment(props.brandPost.createdAt).format("YYYY-MM-DD")}
					</Typography>

					<Typography align="right" variant="subtitle1" fontStyle="italic">
						- {getUserName()}
					</Typography>
				</div>
			</div>
		</div>
	);
};

export default BrandPostComponent;
