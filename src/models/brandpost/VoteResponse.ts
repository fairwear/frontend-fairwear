import VoteEnum from "@models/brandpost/VoteEnum";

interface VoteResponse {
	vote: VoteEnum;
	createdAt: Date;
	userId: number;
	postId: number;
}

export default VoteResponse;
