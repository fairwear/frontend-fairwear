import BrandAPI from "@api/BrandAPI";
import UploadIconButton from "@components/button/UploadIconButton";
import FormAutocomplete from "@components/form/FormAutoComplete";
import FormTextField from "@components/form/FormTextField";
import ScannerPaperComponent from "@components/scanner/ScannerPaperComponent";
import BrandResponse from "@models/brand/BrandResponse";
import { Camera, CloseOutlined } from "@mui/icons-material";
import {
	Button,
	ClickAwayListener,
	Divider,
	IconButton,
	SwipeableDrawer,
	Typography,
} from "@mui/material";
import alerts from "@redux/alerts";
import { AlertValue } from "@redux/store/alert/AlertState";
import { Form, Formik, FormikProps } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import "./Items.css";

interface ItemCreateFormProps {
	handleSubmit: (values: CreateItemFormValues) => void;
}

const CreateItemForm = (props: ItemCreateFormProps) => {
	const { handleSubmit } = props;

	const [brands, setBrands] = useState<BrandResponse[]>([]);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [scannerDrawerOpen, setScannerDrawerOpen] = useState<boolean>(false);
	const [hasPermission, setHasPermission] = useState<boolean>(false);
	const [mediaStream, setMediaStream] = useState<MediaStream | undefined>();
	const [image, setImage] = useState<File | undefined>();

	const handleScannerDrawerClose = () => {
		setScannerDrawerOpen(false);
		mediaStream?.getVideoTracks()[0].stop();
	};

	const handleScannerDrawerOpen = async () => {
		await handleAskCameraPermission();
		setIsLoaded(true);
		setTimeout(() => {
			setScannerDrawerOpen(true);
		}, 150);
	};

	useEffect(() => {
		getBrands();
	}, []);

	useEffect(() => {
		const track = mediaStream?.getVideoTracks()[0];
		if (track?.readyState === "live") {
			setIsLoaded(true);
		}
		if (track?.readyState === "ended") {
			setTimeout(() => {
				setIsLoaded(false);
			}, 300);
		}
		console.log(track);
	}, [mediaStream?.getVideoTracks()]);

	const getBrands = async () => {
		let response = await BrandAPI.findAll();
		setBrands(response);
	};

	const handleAskCameraPermission = async () => {
		try {
			const mediaStream: MediaStream =
				await navigator.mediaDevices.getUserMedia({
					video: true,
				});
			setHasPermission(true);
			setMediaStream(mediaStream);

			return mediaStream;
		} catch (error: any) {
			handlePermissionError();
			setHasPermission(false);
			setMediaStream(undefined);

			throw error;
		}
	};

	const handlePermissionError = () => {
		const permissionAlert: AlertValue = {
			isOpen: true,
			message: "Please allow camera access to be able to scan barcodes.",
			alertSeverity: "error",
			alertType: "toast",
		};
		alerts.addAlert(permissionAlert);
	};

	const handleImageUpload = (file: FileList) => {
		setImage(file[0]);
		console.log(file[0]);
	};

	const handleRemoveImage = () => {
		setImage(undefined);
	};

	const brandNames = brands.map((brand) => brand.name);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
			enableReinitialize
		>
			{(formik: FormikProps<any>) => (
				<Form className="item-create-form">
					<FormTextField
						name="name"
						title="Cloting Item"
						placeholder="What is the name of this item?"
					/>
					<FormAutocomplete
						name="brandName"
						options={brandNames}
						title="Brand"
						placeholder="What is the brand of this item?"
						variant="outlined"
					/>

					<ClickAwayListener onClickAway={handleScannerDrawerClose}>
						<SwipeableDrawer
							open={scannerDrawerOpen}
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
							onClose={handleScannerDrawerClose}
							onOpen={handleScannerDrawerOpen}
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
							<ScannerPaperComponent
								name="barcode"
								isLoaded={isLoaded}
								hasPermission={hasPermission}
								handleScannerClose={handleScannerDrawerClose}
								handleAskCameraPermission={handleAskCameraPermission}
								closeOnSuccessfulScan
							/>
						</SwipeableDrawer>
					</ClickAwayListener>
					<FormTextField
						name="barcode"
						title="Barcode"
						placeholder="What is the barcode of this item?"
						endIcon={
							<IconButton onClick={handleScannerDrawerOpen}>
								<Camera
									style={{
										width: "28px",
										height: "28px",
										color: "grey",
									}}
								/>
							</IconButton>
						}
					/>
					<div className="item-create-form__image-upload-container">
						<Typography variant="h4">Image</Typography>
						{!image && (
							<div className="item-create-form__image-upload-actions">
								<Typography variant="h4">Add Image</Typography>
								<UploadIconButton
									id="image-upload"
									name="image"
									handleUpload={handleImageUpload}
								/>
							</div>
						)}
						{image && (
							<div className="item-create-form__image-preview-container">
								<IconButton
									className="close-button"
									onClick={() => {
										handleRemoveImage();
										formik.setFieldValue("image", null);
									}}
									style={{
										alignSelf: "flex-end",
									}}
								>
									<CloseOutlined />
								</IconButton>
								<div className="item-create-form__image-preview">
									<img src={URL.createObjectURL(image)} alt="item" />
								</div>
							</div>
						)}
					</div>

					<Button
						fullWidth
						style={{
							marginTop: "auto",
							alignSelf: "flex-end !important",
							padding: "8px 16px",
						}}
						disabled={formik.isSubmitting || !formik.isValid}
						variant="contained"
						type="submit"
					>
						Submit
					</Button>
				</Form>
			)}
		</Formik>
	);
};

export interface CreateItemFormValues {
	name: string;
	barcode: string;
	brandName: string;
	image: File | null;
}

const initialValues: CreateItemFormValues = {
	name: "",
	barcode: "",
	brandName: "",
	image: null,
};

const validationSchema = yup.object({
	name: yup.string().required("Name is required"),
	barcode: yup.string().required("Barcode is required"),
	brandName: yup.string().required("Brand is required").nullable(),
	image: yup.mixed().required("Image is required").nullable(),
});

export default CreateItemForm;
