import ReportStatusEnum from "@models/report/ReportStatusEnum";

interface CreateReportRequest {
	createdAt: Date;
	reportReason: string;
	comment?: string;
	status: ReportStatusEnum;
}

export default CreateReportRequest;
