import { TableCell, TableRow, Typography } from "@mui/material";
import "./Report.css";

const ReportTableHeaderRow = () => {
	return (
		<TableRow className="report-header-row">
			<TableCell className="id-cell" align="left">
				<Typography variant="body1" align="left">
					ID
				</Typography>
			</TableCell>
			<TableCell className="brandpost-title-cell" align="center">
				<Typography variant="body1">Reported post title</Typography>
			</TableCell>
			<TableCell className="report-reason-cell" align="center">
				<Typography variant="body1">Report reason</Typography>
			</TableCell>
			<TableCell className="report-status-cell" align="center">
				<Typography variant="body1">Report status</Typography>
			</TableCell>
			<TableCell className="report-created-by-cell" align="center">
				<Typography variant="body1">Reported by</Typography>
			</TableCell>
			<TableCell className="report-created-at-cell" align="center">
				<Typography variant="body1">Reported at</Typography>
			</TableCell>
			<TableCell className="more-options-cell flex-in-row">
				<Typography variant="body1">Actions</Typography>
			</TableCell>
		</TableRow>
	);
};

export default ReportTableHeaderRow;
