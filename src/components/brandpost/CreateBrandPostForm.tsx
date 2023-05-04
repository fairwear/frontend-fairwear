import BrandAPI from "@api/BrandAPI";
import DialogFooter from "@components/dialog/DialogFooter";
import FormAutocomplete from "@components/form/FormAutoComplete";
import FormTextField from "@components/form/FormTextField";
import BrandResponse from "@models/brand/BrandResponse";
import BrandPostToTopicEntry from "@models/brandpost/BrandPostToTopicEntry";
import { DialogContent } from "@mui/material";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import "./BrandPost.css";

interface CreateBrandPostFormProps {
	handleFormSubmit: (values: CreateBrandPostFormValues) => void;
	handleDialogClose: () => void;
}

// TODO: Think about adding steps to this form (StepperComponent)
const CreateBrandPostForm = (props: CreateBrandPostFormProps) => {
	const { handleFormSubmit, handleDialogClose } = props;

	const [brands, setBrands] = useState<BrandResponse[]>([]);

	useEffect(() => {
		getBrands();
	}, []);

	const getBrands = async () => {
		let response = await BrandAPI.findAll();
		setBrands(response);
	};

	const brandNames = brands.map((brand) => brand.name);

	const handleSubmit = (
		values: CreateBrandPostFormValues,
		formik: FormikHelpers<any>
	) => {
		let brand = brands.find((brand) => brand.name === values.brandName);

		if (brand) {
			values.brandId = brand.id;
			handleFormSubmit(values);
		} else {
			formik.setErrors({
				brandName: "Brand does not exist",
			});
		}
	};

	return (
		<Formik
			onSubmit={handleSubmit}
			validationSchema={validationSchema}
			initialValues={initialValues}
		>
			{(formik: FormikProps<any>) => (
				<Form className="create-brandpost-form">
					<DialogContent className="dialog-content">
						<FormTextField
							title="Post Title"
							name="title"
							placeholder="What will be title of your post?"
						/>
						<FormTextField
							title="Post Body"
							name="body"
							placeholder="What is your post about?"
							multiline
							maxRows={6}
						/>
						<FormAutocomplete
							name="brandName"
							options={brandNames}
							title="Brand"
							placeholder="What brand is this post about?"
							variant="outlined"
						/>
					</DialogContent>
					<DialogFooter
						confirmButtonAction={() => console.log("Submitting...")}
						confirmButtonType="submit"
						confirmButtonLabel={
							formik.isSubmitting ? "Submitting..." : "Submit"
						}
						cancelButtonAction={handleDialogClose}
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

export interface CreateBrandPostFormValues {
	title: string;
	body: string;
	brandId: number;
	brandName: string;
	selectedTopics: BrandPostToTopicEntry[];
	itemIds: string[];
}

const initialValues: CreateBrandPostFormValues = {
	title: "",
	body: "",
	brandId: -1,
	brandName: "",
	selectedTopics: [],
	itemIds: [],
};

const validationSchema = yup.object({
	title: yup.string().required("Title is required"),
	body: yup.string().required("Body is required"),
	brandId: yup.number().nullable(),
	brandName: yup.string().required("Please choose a brand"),
	selectedTopics: yup.array().optional(),
	// .required("Please choose at least one topic"),
	itemIds: yup.array().optional(),
});

export default CreateBrandPostForm;
