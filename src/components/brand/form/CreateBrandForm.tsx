import DialogFooter from "@components/dialog/DialogFooter";

import FormTextField from "@components/form/FormTextField";
import { DialogContent, Divider } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { ChangeEvent, useRef, useState } from "react";
import * as yup from "yup";
import "./BrandFormComponents.css";
import DragOnFileInput from "@components/button/DragOnFileInput";

interface CreateBrandFormProps {
	handleFormSubmit: (values: CreateBrandFormValues) => void;
	handleDialogClose: () => void;
}

const CreateBrandForm = (props: CreateBrandFormProps) => {
	const { handleFormSubmit } = props;

	const [images, setImages] = useState<File[]>([]);

	const hiddenInputRef = useRef<HTMLInputElement | null>(null);

	const handleImageRemove = (removedImage: File) => {
		setImages((prevImages) =>
			prevImages.filter((image) => image !== removedImage)
		);
	};

	const handleClick = () => {
		hiddenInputRef.current?.click();
	};

	const handleImageUpload = (file: File) => {
		setImages((prevImages) => [...prevImages, file]);
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			let image = e.target.files[0];

			handleImageUpload(image);
		}
	};

	const handleSubmit = async (values: CreateBrandFormValues) => {
		console.log(values);

		handleFormSubmit(values);
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleSubmit}
			validationSchema={validationSchema}
			enableReinitialize
		>
			{(formik: FormikProps<any>) => (
				<Form className="create-brand-form">
					<DialogContent
						style={{
							display: "flex",
							flexDirection: "column",
							padding: "24px 32px",
							boxSizing: "border-box",
							gap: "32px",
						}}
					>
						<FormTextField
							title="Brand Name"
							name="name"
							placeholder="Enter brand name"
						/>
						<FormTextField
							title="Brand Description"
							name="description"
							placeholder="Enter brand description"
							multiline
							maxRows={6}
						/>
						<DragOnFileInput
							name="brandLogo"
							images={images}
							hiddenInputRef={hiddenInputRef}
							handleClick={handleClick}
							handleFileChange={handleFileChange}
							handleImageChange={handleImageRemove}
							buttonContainerStyle={{
								display: "flex",
								justifyContent: "flex-start",
								width: "100%",
							}}
							buttonStyle={{
								border: "1px solid rgba(34, 34, 34, 0.8)",
								borderRadius: "5px",
							}}
						/>
					</DialogContent>
					<DialogFooter
						confirmButtonAction={() => console.log("Submit")}
						confirmButtonType="submit"
						confirmButtonLabel={
							formik.isSubmitting ? "Submitting..." : "Submit"
						}
						cancelButtonAction={props.handleDialogClose}
						cancelButtonLabel="Close"
						containerStyle={{
							padding: "24px",
						}}
						isConfirmDisabled={!(formik.isValid && formik.dirty)}
					/>
				</Form>
			)}
		</Formik>
	);
};

export interface CreateBrandFormValues {
	name: string;
	// TODO: Add description in Backend
	description: string;
	brandLogo: File | null;
}

const initialValues: CreateBrandFormValues = {
	name: "",
	description: "",
	brandLogo: null,
};

const validationSchema = yup.object().shape({
	name: yup.string().required("Please enter a name"),
	description: yup.string().required("Please enter a description"),
	brandLogo: yup.mixed().required("Please upload a logo").nullable(),
});

export default CreateBrandForm;
