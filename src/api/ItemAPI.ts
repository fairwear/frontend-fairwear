import apiEndpoints from "@constants/apiEndpoints";
import ItemCreateRequest from "@models/item/ItemCreateRequest";
import ItemResponse from "@models/item/ItemResponse";
import ItemUpdateRequest from "@models/item/ItemUpdateRequest";
import axios from "axios";

const apiEndpoint = apiEndpoints.item;

const ItemAPI = {
	findAll: (): Promise<ItemResponse[]> => axios.get(apiEndpoint),
	findById: (id: number): Promise<ItemResponse> =>
		axios.get(`${apiEndpoint}/${id}`),
	findByName: (name: string): Promise<ItemResponse> =>
		axios.get(`${apiEndpoint}/name/${name}`),
	findByBarcode: (barcode: string): Promise<ItemResponse> =>
		axios.get(`${apiEndpoint}/barcode/${barcode}`),
	create: (request: ItemCreateRequest): Promise<ItemResponse> =>
		axios.post(apiEndpoint, request),
	update: (request: ItemUpdateRequest): Promise<ItemResponse> =>
		axios.put(apiEndpoint, request),
	delete: (id: number): Promise<ItemResponse> =>
		axios.delete(`${apiEndpoint}/${id}`),
	search: (query: string): Promise<ItemResponse[]> =>
		axios.get(`${apiEndpoint}/search/${query}`),
};

export default ItemAPI;
