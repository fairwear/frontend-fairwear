import ReportReasonEnum from "@models/report/ReportReasonEnum";
import ReportResultEnum from "@models/report/ReportResultEnum";
import ReportStatusEnum from "@models/report/ReportStatusEnum";

interface UpdateReportRequest {
	id: number;
	reportReason: ReportReasonEnum | string;
	status: ReportStatusEnum;
	reportResult: ReportResultEnum;
	comment?: string;
	resolvedAt: Date;
}

export default UpdateReportRequest;