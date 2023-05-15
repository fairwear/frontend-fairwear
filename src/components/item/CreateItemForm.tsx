import BrandAPI from "@api/BrandAPI";
import UploadIconButton from "@components/button/UploadIconButton";
import FormAutocomplete from "@components/form/FormAutoComplete";
import FormTextField from "@components/form/FormTextField";
import ScannerPaperComponent from "@components/scanner/ScannerPaperComponent";
import BrandResponse from "@models/brand/BrandResponse";
import {
	AddPhotoAlternate,
	Camera,
	CloseOutlined,
	ErrorRounded,
} from "@mui/icons-material";
import {
	Box,
	Button,
	CircularProgress,
	ClickAwayListener,
	Divider,
	IconButton,
	SwipeableDrawer,
	Typography,
} from "@mui/material";
import alerts from "@redux/alerts";
import { AlertValue } from "@redux/store/alert/AlertState";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
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

	const handleImageUpload = (file: File) => {
		setImage(file);
	};

	const handleRemoveImage = (formik: FormikProps<CreateItemFormValues>) => {
		setImage(undefined);
		formik.setFieldValue("itemImage", "");
		formik.setFieldTouched("itemImage", true);
		formik.setFieldError("itemlol", "Item image is required");
		formik.setSubmitting(false);
		setTimeout(() => {
			formik.validateField("itemImage");
		}, 500);
	};

	const brandNames = brands.map((brand) => brand.name);

	const handleFormSubmit = (
		values: CreateItemFormValues,
		formikHelpers: FormikHelpers<any>
	) => {
		const findBrandId = brands.find(
			(brand) => brand.name === values.brandName
		)?.id;
		if (findBrandId) {
			values.brandId = findBrandId.toString();
			handleSubmit(values);
			formikHelpers.setSubmitting(false);
		} else {
			formikHelpers.setFieldError(
				"brandName",
				`Brand with name ${values.brandName} was  not found`
			);
			formikHelpers.setSubmitting(false);
			throw new Error(`Brand with name ${values.brandName} not found`);
		}
	};

	const validationSchema = yup.object({
		name: yup.string().required("Name is required"),
		barcode: yup.string().required("Barcode is required"),
		brandName: yup
			.string()
			.required("Brand is required")
			.nullable()
			.oneOf(brandNames, "Please choose a valid brand from the list"),
		itemImage: yup
			.mixed()
			.required("Image is required")
			.test({
				name: "isString",
				exclusive: false,
				message: "Image is required",
				test: async (value) => {
					await new Promise((resolve) => setTimeout(resolve, 0));

					if (value === "" || !value) {
						return false;
					}
					return true;
				},
			})
			.test({
				name: "fileSize",
				exclusive: false,
				message: "Image size is too large",
				test: async (value) => {
					await new Promise((resolve) => setTimeout(resolve, 0));
					return (value as File).size <= 2000000;
				},
			}),
	});

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleFormSubmit}
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
					<Field
						name="itemImage"
						value={formik.values.itemImage}
						error={formik.touched.itemImage && Boolean(formik.errors.itemImage)}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							formik.setFieldError("itemImage", "");
							// formik.validateField("itemImage");
						}}
						render={() => (
							<div className="item-create-form__image-upload-container">
								<Typography variant="h4">Image</Typography>
								{!image && (
									<UploadIconButton
										id="image-upload"
										name="itemImage"
										value={formik.values.itemImage}
										handleUpload={handleImageUpload}
										buttonComponent={<AddPhotoButton />}
									/>
								)}
								{image && (
									<div className="item-create-form__image-preview-container">
										<IconButton
											className="close-button"
											onClick={() => {
												handleRemoveImage(formik);
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
								{Boolean(formik.errors.itemImage) &&
									formik.touched.itemImage && (
										<Box className="image-error-container">
											<ErrorRounded className="image-error-icon" />

											<Typography
												variant="body1"
												color={"#C62828"}
												align="left"
											>
												{formik.getFieldMeta("itemImage").error}
											</Typography>
										</Box>
									)}
							</div>
						)}
					/>
					<Button
						fullWidth
						style={{
							marginTop: "auto",
							padding: "12px 16px",
							marginBottom: "-32px",
						}}
						disabled={formik.isSubmitting || !formik.isValid}
						variant="contained"
						type="submit"
					>
						{formik.isSubmitting ? (
							<CircularProgress
								style={{
									width: "24px",
									height: "24px",
									color: "white",
								}}
							/>
						) : (
							<Typography variant="h5">Submit Item</Typography>
						)}
					</Button>
				</Form>
			)}
		</Formik>
	);
};

const AddPhotoButton = () => {
	return (
		<div className="item-create-form__image-upload-actions">
			<Typography variant="h4">Add Image</Typography>
			<AddPhotoAlternate
				style={{
					width: "28px",
					height: "28px",
					color: "grey",
				}}
			/>
		</div>
	);
};

export interface CreateItemFormValues {
	name: string;
	barcode: string;
	brandName: string;
	brandId: string;
	itemImage: File | "";
}

const initialValues: CreateItemFormValues = {
	name: "",
	barcode: "",
	brandName: "",
	brandId: "",
	itemImage: "",
};

export default CreateItemForm;
