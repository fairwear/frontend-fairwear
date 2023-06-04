import {
	CircularProgress,
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
} from "@mui/material";
import AppTheme from "../../AppTheme";
import { useEffect, useState } from "react";
import "./TableComponents.css";

interface CustomTableProps {
	data: any[];
	isLoading: boolean;
	HeaderRow?: () => JSX.Element;
	ContentRow: (row: any) => JSX.Element;
	hasContainerComponent?: boolean;
	containerStyle?: React.CSSProperties;
	style?: React.CSSProperties;
}

const rowsPerPage = 50;

const CustomTable = (props: CustomTableProps) => {
	const {
		data,
		isLoading,
		hasContainerComponent = false,
		HeaderRow,
		ContentRow,
	} = props;
	const [page, setPage] = useState(0);

	useEffect(() => {
		if (data.length <= rowsPerPage) {
			setPage(0);
		}
	}, [data.length]);
	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage);
	};
	return (
		<TableContainer
			style={{
				boxShadow: "none",
				maxWidth: "100%",
				background: "transparent",
				padding: "0px",
				borderRadius: "50px",
				...props.containerStyle,
			}}
			component={hasContainerComponent ? Container : Paper}
		>
			<Table
				className="custom-table"
				style={{
					...props.style,
				}}
			>
				{HeaderRow !== undefined && (
					<TableHead className={"custom-table-header"}>
						<HeaderRow />
					</TableHead>
				)}

				<TableBody className="custom-table-body" style={{ gap: "10px" }}>
					{isLoading ? (
						<TableRow>
							<TableCell className={"loading-icon-style"}>
								<CircularProgress
									size={rowsPerPage}
									style={{
										marginTop: "92px",
										color: AppTheme.palette.primary.main,
									}}
								/>
							</TableCell>
						</TableRow>
					) : (
						<>
							{data
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((object, index) => (
									<ContentRow key={index} row={object} />
								))}
						</>
					)}
				</TableBody>
				{!isLoading && data.length > 50 && (
					<TableFooter className="custom-table-footer">
						<TableRow className="custom-table-footer-row">
							<TablePagination
								labelDisplayedRows={({ from, to, count }) =>
									`${from}-${to} iš ${count}`
								}
								className="custom-table-footer-pagination"
								count={data.length}
								page={page}
								rowsPerPageOptions={[]}
								rowsPerPage={rowsPerPage}
								onPageChange={handleChangePage}
								showFirstButton
								showLastButton
								sx={{
									"& .MuiTablePagination-toolbar": {
										padding: "0px !important",
										"& .MuiToolbar-gutters": {
											padding: "0px !important",
										},
									},
								}}
								align="right"
							/>
						</TableRow>
					</TableFooter>
				)}
			</Table>
		</TableContainer>
	);
};

export default CustomTable;
