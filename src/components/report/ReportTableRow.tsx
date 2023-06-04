import ReportResponse from "@models/report/ReportResponse";
import { EditRounded, RemoveRedEye } from "@mui/icons-material";
import { IconButton, TableCell, TableRow, Typography } from "@mui/material";
import moment from "moment";
import AppTheme from "../../AppTheme";
import "./Report.css";

interface AdminReportTableRowProps {
	row: any;
	handlePreviewDialogOpen: (report: ReportResponse) => void;
	handleEditDialogOpen: (report: ReportResponse) => void;
}

const AdminReportTableRow = (props: AdminReportTableRowProps) => {
	const { row, handlePreviewDialogOpen } = props;
	const report = row.row as ReportResponse;

	const handleClick = () => {
		props.handlePreviewDialogOpen(props.row);
	};

	return (
		<>
			<TableRow className="report-table-row" onClick={handleClick}>
				<TableCell className="id-cell" align="left">
					<Typography variant="body1" align="left">
						{report.id}
					</Typography>
				</TableCell>
				<TableCell className="brandpost-title-cell">
					<Typography variant="body1">{report.post?.title}</Typography>
				</TableCell>
				<TableCell className="report-reason-cell">
					<Typography variant="body1">{report.reportReason}</Typography>
				</TableCell>
				<TableCell className="report-status-cell">
					<Typography variant="body1">{report.status}</Typography>
				</TableCell>
				<TableCell className="report-created-by-cell">
					<Typography variant="body1">{report.author?.username}</Typography>
				</TableCell>
				<TableCell className="report-created-at-cell">
					<Typography variant="body2" align="center">
						{moment(report.createdAt).format("YYYY-MM-DD HH:mm:ss")}
					</Typography>
				</TableCell>
				<TableCell className="more-options-cell flex-in-row">
					<IconButton onClick={() => handlePreviewDialogOpen(report)}>
						<RemoveRedEye style={{ color: AppTheme.palette.grey[600] }} />
					</IconButton>
					<IconButton onClick={() => handlePreviewDialogOpen(report)}>
						<EditRounded
							style={{
								color: AppTheme.palette.grey[700],
							}}
						/>
					</IconButton>
				</TableCell>
			</TableRow>
		</>
	);
};

export default AdminReportTableRow;
