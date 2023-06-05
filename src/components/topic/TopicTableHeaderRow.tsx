import { TableCell, TableRow, Typography } from "@mui/material";
import "./Topic.css";

const TopicTableHeaderRow = () => {
	return (
		<TableRow className="report-header-row">
			<TableCell className="id-cell" align="left">
				<Typography variant="body1" align="left">
					ID
				</Typography>
			</TableCell>
			<TableCell className="topic-name-cell" align="center">
				<Typography variant="body2">Name</Typography>
			</TableCell>
			<TableCell className="topic-is-subtopic-cell">
				<Typography variant="body2">Is subtopic</Typography>
			</TableCell>
			<TableCell className="topic-created-at-cell">
				<Typography variant="body2">Created at</Typography>
			</TableCell>
			<TableCell className="topic-updated-at-cell">
				<Typography variant="body2" align="center">
					Updated at
				</Typography>
			</TableCell>
			<TableCell className="topic-deleted-at-cell">
				<Typography variant="body2" align="center">
					Deleted at
				</Typography>
			</TableCell>
			<TableCell className="more-options-cell flex-in-row">
				<Typography variant="body1">Actions</Typography>
			</TableCell>
		</TableRow>
	);
};

export default TopicTableHeaderRow;
