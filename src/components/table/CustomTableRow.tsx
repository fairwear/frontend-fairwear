import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Box, Collapse, IconButton, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import "./AdminComponents.css";
import './TableComponents.css'

interface CustomTableRowProps {
	children: any;
	style?: React.CSSProperties;
	className?: string;
	collapsableItems?: JSX.Element;
	collapsibleClassName?: string;
	showButtonOnLeftSide?: boolean;
	handleClick?: (event: any) => void;
	showDivRef?: React.RefObject<HTMLDivElement>;
}

const CustomTableRow = (props: CustomTableRowProps) => {
	const {
		children,
		collapsableItems,
		showButtonOnLeftSide = false,
		style,
		className,
		collapsibleClassName,
		handleClick,
		showDivRef = null,
	} = props;

	const [open, setOpen] = useState(false);
	const [topBottomPadding, setTopBottomPadding] = useState<string>("0px");

	const handleShow = () => {
		setOpen(!open);
		const padding: string = !open ? "16px" : "0px";
		const timeout: number = !open ? 0 : 250;
		setTimeout(() => {
			setTopBottomPadding(padding);
		}, timeout);
	};

	const ShowButton = (
		<TableCell ref={showDivRef} className="arrow-cell" align={"left"}>
			<IconButton onClick={handleShow} aria-label="expand row" size="small">
				{open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
			</IconButton>
		</TableCell>
	);

	return (
		<>
			<TableRow
				className={
					(className ?? "customTableRow-table-row") +
					" custom-table-hover-effects"
				}
				style={{
					...style,
				}}
				onClick={(e: any) => handleClick && handleClick(e)}
			>
				{collapsableItems && showButtonOnLeftSide && <>{ShowButton}</>}
				{children}
				{collapsableItems && !showButtonOnLeftSide && <>{ShowButton}</>}
			</TableRow>
			{collapsableItems && (
				<TableRow
					className={
						open
							? "expanded-collapse-row customTableRow-body-table-row"
							: "customTableRow-body-table-row"
					}
				>
					<TableCell
						className={"custom-table-body-cell"}
						colSpan={6}
						style={{
							paddingTop: topBottomPadding,
							paddingBottom: topBottomPadding,
						}}
					>
						<Collapse in={open} timeout="auto" unmountOnExit>
							<Box
								className={
									collapsibleClassName ?? "custom-table-body-container"
								}
							>
								{collapsableItems}
							</Box>
						</Collapse>
					</TableCell>
				</TableRow>
			)}
		</>
	);
};

export default CustomTableRow;
