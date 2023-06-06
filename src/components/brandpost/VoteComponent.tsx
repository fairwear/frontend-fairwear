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
import { useAppSelector } from "@redux/store/hooks";
import { useEffect, useState } from "react";
import "./BrandPost.css";
import AppTheme from "../../AppTheme";

interface VoteComponentProps {
	brandPostId: number;
}

const VoteComponent = (props: VoteComponentProps) => {
	const { brandPostId } = props;

	const isUserLoggedIn = useAppSelector((state) => state.common.isLoggedIn);

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
		if (!isUserLoggedIn) return;
		const response = await BrandPostAPI.getIsVoted(brandPostId);
		if (response.vote === VoteEnum.UPVOTE) setUpvote(true);
		else if (response.vote === VoteEnum.DOWNVOTE) setDownvote(true);
		setIsVoted(response);
	};

	const vote = async (vote: VoteEnum) => {
		const voteEntry = { vote: vote, brandPostId: brandPostId };
		await BrandPostAPI.vote(brandPostId, voteEntry);
		await countVotes();
		await getIsVoted();
	};

	const countVotes = async () => {
		const response = await BrandPostAPI.getVotes(brandPostId);
		const upvotes = response.upvotes;
		const downvotes = response.downvotes;
		setVoteCount(upvotes - downvotes);
	};

	const handleUpvote = () => {
		setUpvote(!upvote);
		setDownvote(false);
		vote(VoteEnum.UPVOTE);
	};

	const handleDownvote = () => {
		setDownvote(!downvote);
		setUpvote(false);
		vote(VoteEnum.DOWNVOTE);
	};

	return (
		<div className="vote-count-container">
			<Checkbox
				disabled={!isUserLoggedIn}
				icon={
					<ThumbUpOutlined
						style={{
							color: AppTheme.palette.grey[700],
						}}
					/>
				}
				checkedIcon={
					<ThumbUp
						style={{
							color: AppTheme.palette.grey[900],
						}}
					/>
				}
				checked={upvote}
				inputProps={{ "aria-label": "controlled" }}
				onChange={handleUpvote}
			/>
			<Typography variant="h6">{voteCount}</Typography>
			<Checkbox
				disabled={!isUserLoggedIn}
				icon={
					<ThumbDownOutlined
						style={{
							color: AppTheme.palette.grey[700],
						}}
					/>
				}
				checkedIcon={
					<ThumbDown
						style={{
							color: AppTheme.palette.grey[900],
						}}
					/>
				}
				checked={downvote}
				inputProps={{ "aria-label": "controlled" }}
				onChange={handleDownvote}
			/>
		</div>
	);
};

export default VoteComponent;
