import apiEndpoints from "@constants/apiEndpoints";
import axios from "axios";

const baseUrl = apiEndpoints.file;

const FileAPI = {
	upload: (formData: FormData): Promise<{ filename: string; url: string }> =>
		axios.post(`${baseUrl}/upload`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}),
	uploadMultiple: (
		formData: FormData
	): Promise<
		{
			filename: string;
			path: string;
		}[]
	> =>
		axios.post(`${baseUrl}/upload/multiple`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}),
};

export default FileAPI;
