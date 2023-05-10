import BrandPostResponse from "@models/brandpost/BrandPostResponse";
import VoteEnum from "@models/brandpost/VoteEnum";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import "./BrandPost.css";
import BrandPostAPI from "@api/BrandPostAPI";
import IsVoted from "@models/brandpost/IsVoted";
import UserInfoResponse from "@models/user/UserInfoResponse";

interface BrandPostComponentProps {
	brandPost: BrandPostResponse;
	userPost: UserInfoResponse;
}

const BrandPostComponent = (props: BrandPostComponentProps) => {
	const [isVoted, setIsVoted] = useState<IsVoted | undefined>(undefined);
	const [voteCount, setVoteCount] = useState<number>(0);

	const countVotes = async () => {
		const response = await BrandPostAPI.getVotes(props.brandPost.id);

		const upvotes = response.upvotes;
		const downvotes = response.downvotes;

		setVoteCount(upvotes - downvotes);
	};

	useEffect(() => {
		countVotes();
	}, []);

	const getIsVoted = async () => {
		const response = await BrandPostAPI.getIsVoted(props.brandPost.id);
		console.log("getIsVoted");
		console.log(response);
		setIsVoted(response);
	};

	const vote = async (vote: VoteEnum) => {
		const voteEntry = { vote: vote, brandPostId: props.brandPost.id };
		const result = await BrandPostAPI.vote(props.brandPost.id, voteEntry);
		await countVotes();
		await getIsVoted();

		console.log(result);
	};
	const url = props.brandPost.references.map((url) => {
		return url.sourceUrl;
	});

	const getUserName = () => {
		if (props.userPost) {
			return props.userPost.username;
		}
		return "Anonymous";
	};

	return (
		<div className="brandpost-container">
			<div className="vote-count-container">
				<IconButton onClick={() => vote(VoteEnum.UPVOTE)}>
					<ThumbUp color={isVoted?.vote === "UPVOTE" ? "error" : "inherit"} />
				</IconButton>
				<Typography variant="h6">{voteCount}</Typography>
				<IconButton onClick={() => vote(VoteEnum.DOWNVOTE)}>
					<ThumbDown
						color={isVoted?.vote === "DOWNVOTE" ? "error" : "inherit"}
					/>
				</IconButton>
			</div>
			<div className="brandpost-content-container">
				<div className="brandpost-name-container">
					<Typography align="left" variant="h6">
						{props.brandPost.brand.name}
					</Typography>

					<Typography align="right" variant="h6">
						{getUserName()}
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
						<Typography variant="subtitle1">
							Reference url:<a href={url}>{url}</a>
						</Typography>
					))}

					<Typography variant="subtitle1">
						{moment(props.brandPost.createdAt).format("YYYY-MM-DD")}
					</Typography>
				</div>
			</div>
		</div>
	);
};

export default BrandPostComponent;
