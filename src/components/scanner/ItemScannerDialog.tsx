import ItemAPI from "@api/ItemAPI";
import DialogHeader from "@components/dialog/DialogHeader";
import ScannerPaperComponent from "@components/scanner/ScannerPaperComponent";
import ItemResponse from "@models/item/ItemResponse";
import {
	ClickAwayListener,
	Dialog,
	Divider,
	SwipeableDrawer,
} from "@mui/material";
import { useState } from "react";
import TextFieldsRoundedIcon from "@mui/icons-material/TextFieldsRounded";
import { Form, Formik } from "formik";
import * as yup from "yup";
import FormTextField from "@components/form/FormTextField";

interface ItemScannerDialogProps {
	open: boolean;
	hasPermission: boolean;
	handleClose: () => void;
	handleAskCameraPermission: () => void;
	handleScannerClose: () => void;
	isLoaded: boolean;
}

const ItemScannerDialog = (props: ItemScannerDialogProps) => {
	const {
		open,
		isLoaded,
		hasPermission,
		handleClose,
		handleAskCameraPermission,
		handleScannerClose: handleScannerDrawerClose,
	} = props;

	const [textFieldDrawerOpen, setTextFieldDrawerOpen] = useState<boolean>(true);
	const [itemDrawerOpen, setItemDrawerOpen] = useState<boolean>(false);
	const [barcode, setBarcode] = useState<string | undefined>();
	const [item, setItem] = useState<ItemResponse | undefined>();

	const getItem = async (barcode: string) => {
		let response = await ItemAPI.findByBarcode(barcode);
		setItem(response);
	};

	const handleTextFieldDrawerOpen = async () => {
		setTextFieldDrawerOpen(true);
	};

	const handleTextFieldDrawerClose = () => {
		setTextFieldDrawerOpen(false);
	};

	const toggleTextFieldDrawer = () => {
		setTextFieldDrawerOpen(!textFieldDrawerOpen);
	};

	const handleSubmit = async (values: BarcodeScanerValues) => {
		console.log(values);
		setBarcode(values.barcode);
		await getItem(values.barcode);
		setItemDrawerOpen(true);
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			PaperProps={{
				style: {
					width: "100%",
					height: "100%",
					//TODO: Fix this
					overflow: "hidden",
				},
			}}
		>
			<DialogHeader
				title="Find an Item"
				returnButtonAction={handleClose}
				returnButtonLabel="Close"
				containerStyle={{
					width: "calc(100% - 48px)",
				}}
			/>
			<Formik
				initialValues={initialValues}
				validationSchema={valdationSchema}
				onSubmit={handleSubmit}
				enableReinitialize
			>
				<Form>
					<SwipeableDrawer
						open={textFieldDrawerOpen}
						anchor="bottom"
						variant="persistent"
						disableScrollLock
						SlideProps={{
							unmountOnExit: true,
						}}
						PaperProps={{
							elevation: 12,
							style: {
								position: "absolute",
								backgroundColor: "#FFFFFF",
								borderTopRightRadius: "16px",
								borderTopLeftRadius: "24px",
								borderWidth: "2px",
								padding: "24px",
								paddingBottom: "64px",
							},
						}}
						ModalProps={{
							keepMounted: false,
						}}
						onClose={handleTextFieldDrawerClose}
						onOpen={handleTextFieldDrawerOpen}
					>
						<Divider
							style={{
								marginBottom: "16px",
								width: "10%",
								alignSelf: "center",
								borderWidth: "4px",
								borderRadius: "4px",
							}}
						/>
						<ClickAwayListener onClickAway={handleTextFieldDrawerClose}>
							<FormTextField
								name="barcode"
								label="Barcode"
								fullWidth
								// required
								autoFocus
							/>
						</ClickAwayListener>
					</SwipeableDrawer>
					<ScannerPaperComponent
						name="barcode"
						isLoaded={isLoaded}
						hasPermission={hasPermission}
						handleScannerClose={handleScannerDrawerClose}
						handleAskCameraPermission={handleAskCameraPermission}
						closeOnSuccessfulScan
						actionButtonAction={toggleTextFieldDrawer}
						actionButtonIcon={
							<TextFieldsRoundedIcon
								style={{
									height: "30px",
									width: "30px",
								}}
							/>
						}
					/>
				</Form>
			</Formik>
		</Dialog>
	);
};

interface BarcodeScanerValues {
	barcode: string;
}

const initialValues: BarcodeScanerValues = {
	barcode: "",
};

const valdationSchema = yup.object({
	barcode: yup.string().nullable(),
});

export default ItemScannerDialog;
