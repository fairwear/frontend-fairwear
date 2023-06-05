import apiEndpoints from "@constants/apiEndpoints";
import CreateReportRequest from "@models/report/CreateReportRequest";
import ReportFilterRequest from "@models/report/ReportFilterRequest";
import ReportResponse from "@models/report/ReportResponse";
import UpdateReportRequest from "@models/report/UpdateReportRequest";
import axios from "axios";

const baseUrl = apiEndpoints.report;

const ReportAPI = {
	findAll: (): Promise<ReportResponse[]> => axios.get(baseUrl),
	findAllFilteredBy: (
		filter?: ReportFilterRequest
	): Promise<ReportResponse[]> =>
		axios.get(`${baseUrl}/filter`, {
			params: {
				status: filter?.status,
				result: filter?.result,
			},
		}),
	findById: (id: number): Promise<ReportResponse> =>
		axios.get(`${baseUrl}/${id}`),
	create: (request: CreateReportRequest): Promise<ReportResponse> =>
		axios.post(baseUrl, request),
	update: (id: number, request: UpdateReportRequest): Promise<ReportResponse> =>
		axios.put(`${baseUrl}/${id}`, request),
};

export default ReportAPI;
