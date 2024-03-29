import ItemAPI from "@api/ItemAPI";
import DialogHeader from "@components/dialog/DialogHeader";
import ErrorBanner from "@components/form/ErrorBanner";
import FormTextField from "@components/form/FormTextField";
import FormikUseEffect from "@components/form/FormikUseEffect";
import ItemInfoComponent from "@components/item/ItemInfoComponent";
import PermissionNotice from "@components/scanner/PermissionNotice";
import ScannerPaperComponent from "@components/scanner/ScannerPaperComponent";
import ItemResponse from "@models/item/ItemResponse";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TextFieldsRoundedIcon from "@mui/icons-material/TextFieldsRounded";
import {
	CircularProgress,
	ClickAwayListener,
	Dialog,
	Divider,
	IconButton,
	SwipeableDrawer,
} from "@mui/material";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useState } from "react";
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
	const [errorMessage, setErrorMessage] = useState<string | undefined>();
	const [item, setItem] = useState<ItemResponse | undefined>();

	const getItem = async (barcode: string, helpers?: FormikHelpers<any>) => {
		try {
			let response = await ItemAPI.findByBarcode(barcode);
			setItem(response);
			helpers?.resetForm();
			setErrorMessage(undefined);
		} catch (error) {
			setBarcode(undefined);
			setErrorMessage("No item with such a barcode was found");
			setItem(undefined);
			helpers?.setErrors({ barcode: "No item with such a barcode was found" });
			helpers?.resetForm();
			// console.log("ALERTS:", alerts.getAlerts());
			// console.log("ERROR:", error);
		}
	};

	// useEffect(() => {
	// 	console.log("error message:", errorMessage);
	// }, [errorMessage]);

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

	const handleSubmit = async (
		values: BarcodeScanerValues,
		helpers: FormikHelpers<any>
	) => {
		setBarcode(values.barcode);
		await getItem(values.barcode, helpers);
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
			{errorMessage && (
				<ErrorBanner
					errorMessage={errorMessage}
					errorContainerStyle={{
						width: "calc(100% - 48px)",
					}}
				/>
			)}
			{/* TODO: Add no camera access banner */}
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
											<IconButton
												onClick={() => {
													handleSubmit(formik.values, formik);
													formik.resetForm();
												}}
											>
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
						{!isLoaded && (
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									marginTop: "48px",
									width: "100%",
								}}
							>
								<CircularProgress
									style={{
										width: "72px",
										height: "72px",
									}}
								/>
							</div>
						)}
						{isLoaded && open && hasPermission && (
							<ScannerPaperComponent
								name="barcode"
								isLoaded={isLoaded}
								hasPermission={hasPermission}
								enableRepetitiveScanning
								handleScannerClose={handleScannerClose}
								handleAskCameraPermission={handleAskCameraPermission}
								actionButtonAction={toggleTextFieldDrawer}
								actionButtonIcon={
									<TextFieldsRoundedIcon
										style={{
											height: "32px",
											width: "32px",
										}}
									/>
								}
								handleSuccessfulScan={(barcode: string) => {
									formik.setFieldValue("barcode", barcode);
									handleSubmit(formik.values, formik);
								}}
							/>
						)}
						{!hasPermission && isLoaded && (
							<PermissionNotice
								handleAskCameraPermission={handleAskCameraPermission}
							/>
						)}
						<FormikUseEffect
							value={formik.errors.barcode}
							actionOnUpdate={() => {
								setErrorMessage(formik.errors.barcode as string);
							}}
						/>
					</Form>
				)}
			</Formik>
			<ClickAwayListener
				onClickAway={itemDrawerOpen ? handleItemDrawerClose : () => {}}
			>
				<SwipeableDrawer
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
							handleDialogClose={handleClose}
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
