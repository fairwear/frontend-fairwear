import apiEndpoints from "@constants/apiEndpoints";
import TopicCreateRequest from "@models/topic/TopicCreateRequest";
import TopicFilterRequest from "@models/topic/TopicFilterRequest";
import TopicResponse from "@models/topic/TopicResponse";
import TopicUpdateRequest from "@models/topic/TopicUpdateRequest";
import axios from "axios";

const baseUrl = apiEndpoints.topic;

const TopicAPI = {
	create: (request: TopicCreateRequest): Promise<TopicResponse> =>
		axios.post(baseUrl, request),
	update: (request: TopicUpdateRequest): Promise<TopicResponse> =>
		axios.put(`${baseUrl}/${request.id}`, request),
	findAll: (): Promise<TopicResponse[]> => axios.get(baseUrl),
	findById: (id: number): Promise<TopicResponse> =>
		axios.get(`${baseUrl}/${id}`),
	findTopicsFromBrandByItemId: (id: number): Promise<TopicResponse[]> =>
		axios.get(`${baseUrl}/item/${id}`),
	findAllFilteredBy: (filter?: TopicFilterRequest): Promise<TopicResponse[]> =>
		axios.get(`${baseUrl}/filter`, {
			params: {
				search: filter?.search,
				isSubtopic: filter?.isSubtopic,
				isDeleted: filter?.isDeleted,
			},
		}),
	delete: (id: number): Promise<TopicResponse> =>
		axios.delete(`${baseUrl}/${id}`),
};

export default TopicAPI;
