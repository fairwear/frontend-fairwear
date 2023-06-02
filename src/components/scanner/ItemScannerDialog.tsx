import ItemAPI from "@api/ItemAPI";
import DialogHeader from "@components/dialog/DialogHeader";
import FormTextField from "@components/form/FormTextField";
import ItemInfoComponent from "@components/item/ItemInfoComponent";
import ScannerPaperComponent from "@components/scanner/ScannerPaperComponent";
import ItemResponse from "@models/item/ItemResponse";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TextFieldsRoundedIcon from "@mui/icons-material/TextFieldsRounded";
import {
	ClickAwayListener,
	Dialog,
	Divider,
	IconButton,
	SwipeableDrawer,
} from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { useRef, useState } from "react";
import * as yup from "yup";

interface ItemScannerDialogProps {
	open: boolean;
	hasPermission: boolean;
	handleClose: () => void;
	handleAskCameraPermission: () => void;
	handleScannerClose: () => void;
	handleScannerOpen: () => void;
	isLoaded: boolean;
}

const ItemScannerDialog = (props: ItemScannerDialogProps) => {
	const {
		open,
		isLoaded,
		hasPermission,
		handleClose,
		handleAskCameraPermission,
		handleScannerClose,
		handleScannerOpen,
	} = props;

	const [textFieldDrawerOpen, setTextFieldDrawerOpen] =
		useState<boolean>(false);
	const [itemDrawerOpen, setItemDrawerOpen] = useState<boolean>(false);
	const [barcode, setBarcode] = useState<string | undefined>();
	const [item, setItem] = useState<ItemResponse | undefined>();

	const itemDrawerRef = useRef(null);

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

	const handleItemDrawerOpen = async () => {
		handleScannerClose();
		setItemDrawerOpen(true);
	};

	const handleItemDrawerClose = () => {
		setItemDrawerOpen(false);
		handleScannerOpen();
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
				{(formik: FormikProps<BarcodeScanerValues>) => (
					<Form>
						<SwipeableDrawer
							open={textFieldDrawerOpen}
							anchor="bottom"
							variant="persistent"
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
								<div>
									<FormTextField
										name="barcode"
										label="Barcode"
										fullWidth
										autoFocus
										endIcon={
											<IconButton onClick={() => handleSubmit(formik.values)}>
												<SearchRoundedIcon
													style={{
														width: "28px",
														height: "28px",
														color: "grey",
													}}
												/>
											</IconButton>
										}
									/>
								</div>
							</ClickAwayListener>
						</SwipeableDrawer>
						<ScannerPaperComponent
							name="barcode"
							isLoaded={isLoaded}
							hasPermission={hasPermission}
							handleScannerClose={handleScannerClose}
							handleAskCameraPermission={handleAskCameraPermission}
							closeOnSuccessfulScan
							actionButtonAction={toggleTextFieldDrawer}
							actionButtonIcon={
								<TextFieldsRoundedIcon
									style={{
										height: "32px",
										width: "32px",
									}}
								/>
							}
						/>
					</Form>
				)}
			</Formik>
			<ClickAwayListener
				onClickAway={itemDrawerOpen ? handleItemDrawerClose : () => {}}
			>
				<SwipeableDrawer
					ref={itemDrawerRef}
					open={itemDrawerOpen}
					anchor="bottom"
					variant="persistent"
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
						},
					}}
					ModalProps={{
						keepMounted: false,
					}}
					onClose={handleItemDrawerClose}
					onOpen={handleItemDrawerOpen}
				>
					<Divider
						style={{
							marginTop: "8px",
							width: "10%",
							alignSelf: "center",
							borderWidth: "4px",
							borderRadius: "4px",
						}}
					/>
					{item && (
						<ItemInfoComponent
							item={item}
							handleClose={handleItemDrawerClose}
						/>
					)}
				</SwipeableDrawer>
			</ClickAwayListener>
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
