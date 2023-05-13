import ReportReasonEnum from "@models/report/ReportReasonEnum";

interface CreateReportRequest {
	postId: number;
	reportReason: ReportReasonEnum | string;
	comment?: string;
	createdAt: Date;
}

export default CreateReportRequest;
