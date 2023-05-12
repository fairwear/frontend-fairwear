import ReportStatusEnum from "@models/report/ReportStatusEnum";
import UserInfoResponse from "@models/user/UserInfoResponse";

interface ReportResponse {
	id: number;
	author: UserInfoResponse;
	comment?: string;
	status: ReportStatusEnum;
	reportReason: string | string;
	createdAt: Date;
	resolvedAt?: Date;
}

export default ReportResponse;