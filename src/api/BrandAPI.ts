import apiEndpoints from "@constants/apiEndpoints";
import BrandCreateRequest from "@models/brand/BrandCreateRequest";
import BrandResponse from "@models/brand/BrandResponse";
import BrandUpdateRequest from "@models/brand/BrandUpdateRequest";
import axios from "axios";

const apiEndpoint = apiEndpoints.brand;

const BrandAPI = {
	findAll: (): Promise<BrandResponse[]> => axios.get(apiEndpoint),
	findById: (id: number): Promise<BrandResponse> =>
		axios.get(`${apiEndpoint}/${id}`),
	create: (request: BrandCreateRequest): Promise<BrandResponse> =>
		axios.post(apiEndpoint, request),
	update: (request: BrandUpdateRequest): Promise<BrandResponse> =>
		axios.put(apiEndpoint, request),
	delete: (id: number): Promise<BrandResponse> =>
		axios.delete(`${apiEndpoint}/${id}`),
	search: (query: string): Promise<BrandResponse[]> =>
		axios.get(`${apiEndpoint}/search/${query}`),
};

export default BrandAPI;
