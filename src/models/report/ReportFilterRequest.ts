import ReportResultEnum from "@models/report/ReportResultEnum";
import ReportStatusEnum from "@models/report/ReportStatusEnum";

interface ReportFilterRequest {
	status?: ReportStatusEnum;
	result?: ReportResultEnum;
}

export default ReportFilterRequest;
