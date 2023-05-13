import BrandPostAPI from "@api/BrandPostAPI";
import IsVoted from "@models/brandpost/IsVoted";
import VoteEnum from "@models/brandpost/VoteEnum";
import {
	ThumbDown,
	ThumbDownOutlined,
	ThumbUp,
	ThumbUpOutlined,
} from "@mui/icons-material";
import { Checkbox, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./BrandPost.css";

interface VoteComponentProps {
	brandPostId: number;
}

const VoteComponent = (props: VoteComponentProps) => {
	const { brandPostId } = props;

	const [isVoted, setIsVoted] = useState<IsVoted>();
	const [voteCount, setVoteCount] = useState<number>(0);
	const [upvote, setUpvote] = useState<boolean>(
		isVoted?.vote === VoteEnum.UPVOTE
	);
	const [downvote, setDownvote] = useState<boolean>(
		isVoted?.vote === VoteEnum.DOWNVOTE
	);

	useEffect(() => {
		countVotes();
		getIsVoted();
	}, []);

	const getIsVoted = async () => {
		const response = await BrandPostAPI.getIsVoted(brandPostId);
		console.log("getIsVoted");
		console.log(response);
		if (response.vote === VoteEnum.UPVOTE) setUpvote(true);
		else if (response.vote === VoteEnum.DOWNVOTE) setDownvote(true);
		setIsVoted(response);
	};

	const vote = async (vote: VoteEnum) => {
		const voteEntry = { vote: vote, brandPostId: brandPostId };
		const result = await BrandPostAPI.vote(brandPostId, voteEntry);
		await countVotes();
		await getIsVoted();

		console.log(result);
	};

	const countVotes = async () => {
		const response = await BrandPostAPI.getVotes(brandPostId);

		const upvotes = response.upvotes;
		const downvotes = response.downvotes;

		setVoteCount(upvotes - downvotes);
	};

	const handleUpvote = () => {
		console.log("upvote");
		setUpvote(!upvote);
		setDownvote(false);
		vote(VoteEnum.UPVOTE);
	};

	const handleDownvote = () => {
		console.log("downvote");
		setDownvote(!downvote);
		setUpvote(false);
		vote(VoteEnum.DOWNVOTE);
	};

	return (
		<>
			{isVoted && (
				<div className="vote-count-container">
					<Checkbox
						icon={
							<ThumbUpOutlined
								style={{
									color: "#000000",
									opacity: 0.6,
								}}
							/>
						}
						checkedIcon={
							<ThumbUp
								style={{
									color: "#000000",
									opacity: 0.9,
								}}
							/>
						}
						checked={upvote}
						inputProps={{ "aria-label": "controlled" }}
						onChange={handleUpvote}
					/>
					<Typography variant="h6">{voteCount}</Typography>
					<Checkbox
						icon={
							<ThumbDownOutlined
								style={{
									color: "#000000",
									opacity: 0.6,
								}}
							/>
						}
						checkedIcon={
							<ThumbDown
								style={{
									color: "#000000",
									opacity: 0.9,
								}}
							/>
						}
						checked={downvote}
						inputProps={{ "aria-label": "controlled" }}
						onChange={handleDownvote}
					/>
				</div>
			)}
		</>
	);
};

export default VoteComponent;
