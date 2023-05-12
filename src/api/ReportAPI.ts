import apiEndpoints from "@constants/apiEndpoints";
import CreateReportRequest from "@models/report/CreateReportRequest";
import ReportResponse from "@models/report/ReportResponse";
import axios from "axios";

const baseUrl = apiEndpoints.report;

const ReportAPI = {
	findAll: (): Promise<ReportResponse[]> => axios.get(baseUrl),
	findById: (id: number): Promise<ReportResponse> =>
		axios.get(`${baseUrl}/${id}`),
	create: (request: CreateReportRequest): Promise<ReportResponse> =>
		axios.post(baseUrl, request),
	update: (request: UpdateReportRequest): Promise<ReportResponse> =>
		axios.put(baseUrl, request),
};

export default ReportAPI;
