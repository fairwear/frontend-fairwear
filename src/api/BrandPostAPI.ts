import apiEndpoints from "@constants/apiEndpoints";
import BrandPostCreateRequest from "@models/brandpost/BrandPostCreateRequest";
import BrandPostResponse from "@models/brandpost/BrandPostResponse";
import VoteEntry from "@models/brandpost/VoteEntry";
import axios from "axios";

const baseURL = apiEndpoints.brandPost;

const BrandPostAPI = {
	create: (brandPost: BrandPostCreateRequest): Promise<BrandPostResponse> =>
		axios.post(baseURL, brandPost),
	findAll: (): Promise<BrandPostResponse[]> => axios.get(baseURL),
	findById: (id: number) => axios.get(`${baseURL}/${id}`),
	delete: (id: number) => axios.delete(`${baseURL}/${id}`),
	vote: (id: number, voteEntry: VoteEntry) =>
		axios.post(`${baseURL}/${id}/vote`, voteEntry),
	getVotes: (id: number) => axios.get(`${baseURL}/${id}/votes`),
};

export default BrandPostAPI;
