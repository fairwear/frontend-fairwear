import apiEndpoints from "@constants/apiEndpoints";
import BrandPostCreateRequest from "@models/brandpost/BrandPostCreateRequest";
import BrandPostResponse from "@models/brandpost/BrandPostResponse";
import IsVoted from "@models/brandpost/IsVoted";
import VoteCountResponse from "@models/brandpost/VoteCountResponse";
import VoteEntry from "@models/brandpost/VoteEntry";
import axios from "axios";

const baseURL = apiEndpoints.brandPost;
const uninterceptedAxios = axios.create();

const BrandPostAPI = {
	create: (brandPost: BrandPostCreateRequest): Promise<BrandPostResponse> =>
		axios.post(baseURL, brandPost),
	findAll: (): Promise<BrandPostResponse[]> => axios.get(baseURL),
	findById: (id: number): Promise<BrandPostResponse> =>
		axios.get(`${baseURL}/${id}`),
	findAllByBrandId: (brandId: number): Promise<BrandPostResponse[]> =>
		axios.get(`${baseURL}/brand/${brandId}`),
	delete: (id: number): Promise<BrandPostResponse> =>
		axios.delete(`${baseURL}/${id}`),
	vote: (id: number, voteEntry: VoteEntry) =>
		axios.post(`${baseURL}/${id}/vote`, voteEntry),
	getVotes: (id: number): Promise<VoteCountResponse> =>
		axios.get(`${baseURL}/${id}/votes`),
	getIsVoted: (id: number): Promise<IsVoted> =>
		uninterceptedAxios.get(`${baseURL}/${id}/is-voted`, {
			headers: {
				Authorization: localStorage.getItem("token")
					? `Bearer ${localStorage.getItem("token")}`
					: "",
			},
		}),
	search: (query: string): Promise<BrandPostResponse[]> =>
		axios.get(`${baseURL}/search/${query}`),
	isUserThePostOwner: (id: number): Promise<boolean> =>
		axios.get(`${baseURL}/owner/${id}`),
};

export default BrandPostAPI;
