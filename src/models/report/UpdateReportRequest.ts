import ReportResultEnum from "@models/report/ReportResultEnum";
import ReportStatusEnum from "@models/report/ReportStatusEnum";

interface UpdateReportRequest {
	id: number;
	status: ReportStatusEnum;
	reportResult: ReportResultEnum;
	resolvedAt: Date;
}

export default UpdateReportRequest;
