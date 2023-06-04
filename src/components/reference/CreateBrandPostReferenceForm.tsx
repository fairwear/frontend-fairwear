import { Form, Formik, FormikProps } from "formik";
import * as yup from "yup";
import "./BrandPostReference.css";
import FormTextField from "@components/form/FormTextField";
import DialogFooter from "@components/dialog/DialogFooter";
import { DialogContent } from "@mui/material";

interface CreateBrandPostReferenceFormProps {
	handleSubmit: (values: CreateBrandPostReferenceFormValues) => void;
	handleDialogClose: () => void;
}

//TODO: Delete or refactor this component
const CreateBrandPostReferenceForm = (
	props: CreateBrandPostReferenceFormProps
) => {
	const { handleSubmit, handleDialogClose } = props;

	return (
		<Formik
			onSubmit={handleSubmit}
			validationSchema={validationSchema}
			initialValues={initialValues}
			enableReinitialize
		>
			{(formik: FormikProps<any>) => (
				<Form className="create-brandpost-reference-form">
					<DialogContent className="dialog-content">
						<FormTextField
							title="Post Title"
							name="title"
							placeholder="What will be title of your post?"
						/>
						<FormTextField name="title" title="Title" />
						<FormTextField name="body" title="Body" multiline />
						<FormTextField name="sourceUrl" title="Source URL" />
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

interface CreateBrandPostReferenceFormValues {
	title: string;
	body: string;
	sourceUrl: string;
}

const initialValues: CreateBrandPostReferenceFormValues = {
	title: "",
	body: "",
	sourceUrl: "",
};

const validationSchema = yup.object({
	title: yup.string().required("Title is required").nullable().min(5).max(100),
	body: yup.string().required("Body is required").min(20).max(1000),
	sourceUrl: yup.string().optional(),
});

export default CreateBrandPostReferenceForm;
