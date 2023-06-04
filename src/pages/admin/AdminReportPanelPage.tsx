import BrandPostAPI from "@api/BrandPostAPI";
import ReportAPI from "@api/ReportAPI";
import ReportPreviewDialog from "@components/report/ReportPreviewDialog";
import ReportTableHeaderRow from "@components/report/ReportTableHeaderRow";
import AdminReportTableRow from "@components/report/ReportTableRow";
import CustomTable from "@components/table/CustomTable";
import ReportResponse from "@models/report/ReportResponse";
import ReportResultEnum from "@models/report/ReportResultEnum";
import ReportStatusEnum from "@models/report/ReportStatusEnum";
import UpdateReportRequest from "@models/report/UpdateReportRequest";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./AdminPanelPage.css";
import NoDataFoundComponent from "@components/common/NoDataFoundComponent";

const AdminReportPanelPage = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isPreviewDialogOpen, setIsPreviewDialogOpen] =
		useState<boolean>(false);
	const [reports, setReports] = useState<ReportResponse[]>([]);
	const [selectedReport, setSelectedReport] = useState<
		ReportResponse | undefined
	>(undefined);

	useEffect(() => {
		getReports();
	}, []);

	const getReports = async () => {
		setIsLoading(true);
		const response = await ReportAPI.findAll();
		setReports(response);
		setIsLoading(false);
	};

	const handlePreviewDialogOpen = (report: ReportResponse) => {
		setIsPreviewDialogOpen(true);
		let fixedValue = (report as any).row;
		setSelectedReport(fixedValue);
	};

	const handlePreviewDialogClose = () => {
		setIsPreviewDialogOpen(false);
	};

	const handleRejectReport = async (report: ReportResponse) => {
		let updateReportRequest: UpdateReportRequest = {
			id: report.id,
			status: ReportStatusEnum.RESOLVED,
			reportResult: ReportResultEnum.NO_ACTION,
			resolvedAt: new Date(),
		};

		await ReportAPI.update(report.id, updateReportRequest);
		await getReports();
	};

	const handleDeleteBrandPost = async (report: ReportResponse) => {
		await BrandPostAPI.delete(report.id);

		let updateReportRequest: UpdateReportRequest = {
			id: report.id,
			status: ReportStatusEnum.RESOLVED,
			reportResult: ReportResultEnum.DELETED,
			resolvedAt: new Date(),
		};

		await ReportAPI.update(report.id, updateReportRequest);
		getReports();
	};

	const handleReopenReport = async (report: ReportResponse) => {
		let updateReportRequest: UpdateReportRequest = {
			id: report.id,
			status: ReportStatusEnum.PENDING,
			reportResult: ReportResultEnum.REOPENED,
			resolvedAt: new Date(),
		};

		await ReportAPI.update(report.id, updateReportRequest);
		getReports();
	};

	return (
		<div className="admin-panel-page-container">
			<div className="title-container">
				<Typography variant="h1" align="center">
					Report Managment
				</Typography>
			</div>
			{reports.length > 0 && (
				<CustomTable
					data={reports}
					isLoading={isLoading}
					containerStyle={{
						boxShadow: "none",
						width: "90%",
						maxWidth: "1400px",
						borderRadius: "5px !important",
					}}
					HeaderRow={() => <ReportTableHeaderRow />}
					ContentRow={(row: ReportResponse) => (
						<AdminReportTableRow
							row={row}
							handlePreviewDialogOpen={handlePreviewDialogOpen}
							handleEditDialogOpen={() => {}}
						/>
					)}
				/>
			)}
			{reports.length === 0 && (
				<NoDataFoundComponent
					title="No reports were found"
					message="There are no reports to show. "
					subMessage="Try changing the filtering options or try to again later"
				/>
			)}
			{selectedReport && (
				<ReportPreviewDialog
					report={selectedReport}
					open={isPreviewDialogOpen}
					handleClose={handlePreviewDialogClose}
					handleRejectReport={handleRejectReport}
					handleDeleteBrandPost={handleDeleteBrandPost}
					handleReopenReport={handleReopenReport}
				/>
			)}
		</div>
	);
};

export default AdminReportPanelPage;
