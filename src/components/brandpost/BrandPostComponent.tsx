import BrandPostResponse from "@models/brandpost/BrandPostResponse";
import VoteEnum from "@models/brandpost/VoteEnum";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import { Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import "./BrandPost.css";

interface BrandPostComponentProps {
	brandPost: BrandPostResponse;
}

const BrandPostComponent = (props: BrandPostComponentProps) => {
	console.log(props.brandPost);
	const [isVoted, setIsVoted] = useState<boolean>(false);
	const upvotes = props.brandPost.votes.filter(
		(vote) => vote.vote === VoteEnum.UPVOTE
	);
	const downvotes = props.brandPost.votes.filter(
		(vote) => vote.vote === VoteEnum.DOWNVOTE
	);
	useEffect(() => {
		getIsVoted();
	}, []);

	const getIsVoted = () => {
		setIsVoted(false);
	};

	return (
		<div className="brandpost-container">
			<div className="vote-count-container">
				<ThumbUp className={"icon" + (isVoted ? " voted" : "")} />
				<Typography variant="h6">
					{upvotes.length - downvotes.length}
				</Typography>
				<ThumbDown className={"icon" + (isVoted ? " voted" : "")} />
			</div>
			<div className="brandpost-content-container">
				<Typography align="left" variant="h3">
					{props.brandPost.brand.name}
				</Typography>
				<Typography align="left" variant="body1">
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
					varius enim in eros elementum tristique. Duis cursus, mi quis viverra
					ornare."
				</Typography>
				<div className="brandpost-info-container">
					<Typography variant="subtitle1">
						{moment(props.brandPost.createdAt).format("YYYY-MM-DD")}
					</Typography>
				</div>
			</div>
		</div>
	);
};

export default BrandPostComponent;
