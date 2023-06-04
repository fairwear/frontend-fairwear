import { Table, TableContainer, TableHead } from "@mui/material";
import "./AdminPanelPage.css";

const AdminPanelPage = () => {
	return (
		<div className="admin-panel-page-container">
			<TableContainer>
				<Table className="admin-panel-table" style={{}}>
					<TableHead></TableHead>
				</Table>
			</TableContainer>
		</div>
	);
};

export default AdminPanelPage;
