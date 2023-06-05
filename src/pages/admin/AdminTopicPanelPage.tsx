import TopicAPI from "@api/TopicAPI";
import NoDataFoundComponent from "@components/common/NoDataFoundComponent";
import CustomTable from "@components/table/CustomTable";
import AdminTopicFilterForm from "@components/topic/AdminTopicFilterForm";
import CreateUpdateTopicDialog from "@components/topic/CreateUpdateTopicDialog";
import TopicTableHeaderRow from "@components/topic/TopicTableHeaderRow";
import TopicTableRow from "@components/topic/TopicTableRow";
import TopicFilterRequest from "@models/topic/TopicFilterRequest";
import TopicResponse from "@models/topic/TopicResponse";
import { Button, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./AdminPanelPage.css";
import { AddCircleRounded } from "@mui/icons-material";
import AppTheme from "../../AppTheme";

const AdminTopicPanelPage = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
	const [topics, setTopics] = useState<TopicResponse[]>([]);
	const [selectedTopic, setSelectedTopic] = useState<TopicResponse | undefined>(
		undefined
	);

	useEffect(() => {
		getTopics();
	}, []);

	const getTopics = async (filter?: TopicFilterRequest) => {
		setIsLoading(true);
		const response = await TopicAPI.findAllFilteredBy(filter);
		setTopics(response);
		setIsLoading(false);
	};

	const handleEditDialogOpen = (newTopic: TopicResponse) => {
		setIsEditDialogOpen(true);
		// let fixedValue = (report as any).row;
		setSelectedTopic(newTopic);
	};

	const handleEditDialogClose = () => {
		setIsEditDialogOpen(false);
		setSelectedTopic(undefined);
		getTopics();
	};

	const handleCreateDialogOpen = () => {
		setIsCreateDialogOpen(true);
	};

	const handleCreateDialogClose = () => {
		setIsCreateDialogOpen(false);
		getTopics();
	};

	return (
		<div className="topic-admin-page-container">
			<div className="topic-admin-page-title">
				<Typography variant="h1" align="center">
					Topic Managment
				</Typography>
				<Button
					className="creation-button"
					variant="outlined"
					onClick={handleCreateDialogOpen}
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						gap: "8px",
						textTransform: "none",
						padding: "8px 16px",
					}}
				>
					<AddCircleRounded
						style={{
							width: "24px",
							height: "24px",
						}}
					/>
					Create a Topic
				</Button>
			</div>
			<div className="topic-admin-filter-container">
				<Divider
					style={{
						marginTop: "24px",
						marginBottom: "24px",
						borderColor: AppTheme.palette.grey[500],
						width: "calc(100% + 48px)",
						marginLeft: "-24px",
					}}
				/>
				<AdminTopicFilterForm handleFilter={getTopics} />
			</div>
			{topics.length > 0 && (
				<CustomTable
					data={topics}
					isLoading={isLoading}
					containerStyle={{
						boxShadow: "none",
						width: "90%",
						maxWidth: "1400px",
						borderRadius: "5px !important",
					}}
					ContentRow={(row: TopicResponse) => (
						<TopicTableRow
							row={row}
							handleEditDialogOpen={handleEditDialogOpen}
							reloadTable={getTopics}
						/>
					)}
					HeaderRow={() => <TopicTableHeaderRow />}
				/>
			)}
			{topics.length === 0 && (
				<NoDataFoundComponent
					title="No topics were found"
					message="There are no topics to show."
					subMessage="Try changing the filtering options or try to again later"
				/>
			)}
			<CreateUpdateTopicDialog
				open={isEditDialogOpen}
				state="edit"
				handleClose={handleEditDialogClose}
				topic={selectedTopic}
			/>
			<CreateUpdateTopicDialog
				open={isCreateDialogOpen}
				state="create"
				handleClose={handleCreateDialogClose}
			/>
		</div>
	);
};

export default AdminTopicPanelPage;
