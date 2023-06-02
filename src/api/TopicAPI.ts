import apiEndpoints from "@constants/apiEndpoints";
import TopicResponse from "@models/topic/TopicResponse";
import axios from "axios";

const baseUrl = apiEndpoints.topic;

const TopicAPI = {
	findAll: (): Promise<TopicResponse[]> => axios.get(baseUrl),
	findById: (id: number): Promise<TopicResponse> =>
		axios.get(`${baseUrl}/${id}`),
	findTopicsFromBrandByItemId: (id: number): Promise<TopicResponse[]> =>
		axios.get(`${baseUrl}/item/${id}`),
};

export default TopicAPI;
