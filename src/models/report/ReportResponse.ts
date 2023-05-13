import ReportReasonEnum from "@models/report/ReportReasonEnum";
import ReportResultEnum from "@models/report/ReportResultEnum";
import ReportStatusEnum from "@models/report/ReportStatusEnum";
import UserInfoResponse from "@models/user/UserInfoResponse";

interface ReportResponse {
	id: number;
	author: UserInfoResponse;
	comment?: string;
	status: ReportStatusEnum;
	reportReason: ReportReasonEnum | string;
	reportResult?: ReportResultEnum;
	createdAt: Date;
	resolvedAt?: Date;
	resolvedBy?: UserInfoResponse;
}

export default ReportResponse;
