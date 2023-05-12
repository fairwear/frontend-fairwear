import { Form, Formik } from "formik";
import * as yup from "yup";

interface CreateReportFormProps {
	handleSubmit: (values: CreateReportFormValues) => void;
}

const CreateReportForm = (props: CreateReportFormProps) => {
	const { handleSubmit } = props;
	return (
		<Formik
			onSubmit={handleSubmit}
			initialValues={initialValues}
			validationSchema={validationSchema}
			enableReinitialize
		>
			<Form>
				<div>
					<h1>Report</h1>
				</div>
			</Form>
		</Formik>
	);
};

export interface CreateReportFormValues {
	comment?: string;
}

const initialValues: CreateReportFormValues = {
	comment: "",
};

const validationSchema = yup.object({
	comment: yup.string().required("Comment is required"),
});

export default CreateReportForm;
