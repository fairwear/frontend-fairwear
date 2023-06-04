import TopicAPI from "@api/TopicAPI";
import CustomTable from "@components/table/CustomTable";
import AdminTopicFilterForm from "@components/topic/AdminTopicFilterForm";
import TopicTableHeaderRow from "@components/topic/TopicTableHeaderRow";
import TopicTableRow from "@components/topic/TopicTableRow";
import TopicFilterRequest from "@models/topic/TopicFilterRequest";
import TopicResponse from "@models/topic/TopicResponse";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./AdminPanelPage.css";
import NoDataFoundComponent from "@components/common/NoDataFoundComponent";

const AdminTopicPanelPage = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
	const [topics, setTopics] = useState<TopicResponse[]>([]);
	const [selectedTopic, setSelectedTopic] = useState<TopicResponse | undefined>(
		undefined
	);

	useEffect(() => {
		getTopics();
	}, []);

	const getTopics = async (filter?: TopicFilterRequest) => {
		setIsLoading(true);
		// const response = await TopicAPI.findAllFilteredBy(filter);
		const response = await TopicAPI.findAll();
		setTopics(response);
		setIsLoading(false);
	};

	const handleEditDialogOpen = (topic: TopicResponse) => {
		setIsEditDialogOpen(true);
		// let fixedValue = (report as any).row;
		setSelectedTopic(topic);
	};

	const handleEditDialogClose = () => {
		setIsEditDialogOpen(false);
	};

	const handleFilter = (filter?: TopicFilterRequest) => {
		console.log(filter);
	};

	return (
		<div className="topic-admin-page-container">
			<div className="topic-admin-page-title">
				<Typography variant="h1" align="center">
					Report Managment
				</Typography>
			</div>
			<div className="topic-admin-filter-container">
				<AdminTopicFilterForm handleFilter={handleFilter} />
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
		</div>
	);
};

export default AdminTopicPanelPage;
