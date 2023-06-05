import TopicAPI from "@api/TopicAPI";
import TopicResponse from "@models/topic/TopicResponse";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { IconButton, TableCell, TableRow, Typography } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import AppTheme from "../../AppTheme";
import "./Topic.css";
import DeleteConfirmationDialog from "@components/dialog/DeleteConfirmationDialog";

interface AdminReportTableRowProps {
	row: any;
	handleCreateDialogOpen: (report: TopicResponse) => void;
	handleEditDialogOpen: (report: TopicResponse) => void;
}

const TopicTableRow = (props: AdminReportTableRowProps) => {
	const { row, handleEditDialogOpen } = props;

	const topic = row.row as TopicResponse;

	const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

	const handleDeleteDialogOpen = () => {
		setDeleteDialogOpen(true);
	};

	const handleDeleteDialogClose = () => {
		setDeleteDialogOpen(false);
	};

	const handleDeleteTopic = async () => {
		await TopicAPI.delete(row.row.id);
	};

	const handleClick = () => {
		props.handleEditDialogOpen(props.row);
	};

	return (
		<>
			<TableRow
				className="report-table-row"
				onClick={handleClick}
				style={{
					minWidth: "max-content",
				}}
			>
				<TableCell className="id-cell" align="left">
					<Typography variant="body1" align="left">
						{topic.id}
					</Typography>
				</TableCell>
				<TableCell className="topic-name-cell" align="center">
					<Typography variant="body2">{topic.name}</Typography>
				</TableCell>
				<TableCell className="topic-is-subtopic-cell">
					<Typography variant="body2">
						{topic.topicId ? "true" : "false"}
					</Typography>
				</TableCell>
				<TableCell className="topic-created-at-cell">
					<Typography variant="body2">
						{topic.createdAt !== (undefined || null)
							? moment(topic.createdAt).format("YYYY-MM-DD HH:mm:ss")
							: "null"}
					</Typography>
				</TableCell>
				<TableCell className="topic-updated-at-cell">
					<Typography variant="body2" align="center">
						{topic.updatedAt !== (undefined || null)
							? moment(topic.updatedAt).format("YYYY-MM-DD HH:mm:ss")
							: "null"}
					</Typography>
				</TableCell>
				<TableCell className="topic-deleted-at-cell">
					<Typography variant="body2" align="center">
						{topic.deletedAt !== (undefined || null)
							? moment(topic.deletedAt).format("YYYY-MM-DD HH:mm:ss")
							: "null"}
					</Typography>
				</TableCell>
				<TableCell className="more-options-cell flex-in-row">
					<IconButton onClick={() => handleEditDialogOpen(topic)}>
						<EditOutlined style={{ color: AppTheme.palette.grey[600] }} />
					</IconButton>
					<IconButton onClick={handleDeleteDialogOpen}>
						<DeleteOutlined
							style={{
								color: AppTheme.palette.red[500],
							}}
						/>
					</IconButton>
				</TableCell>
				<DeleteConfirmationDialog
					open={deleteDialogOpen}
					handleClose={handleDeleteDialogClose}
					objectToDelete={`topic`}
					nameToDelete={topic.name}
					dialogSubtext={
						"The topic with ID " +
						topic.id +
						" and name " +
						topic.name +
						"will be deleted. Are you sure?"
					}
					buttonText={"apgyvendinimą"}
					handleDelete={handleDeleteTopic}
					reloadAfterDelete={false}
				/>
			</TableRow>
		</>
	);
};

export default TopicTableRow;
