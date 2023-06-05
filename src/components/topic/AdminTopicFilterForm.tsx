import AutoSubmitToken from "@components/form/AutoSubmitToken";
import FormTextField from "@components/form/FormTextField";
import TopicFilterRequest from "@models/topic/TopicFilterRequest";
import { CheckBoxOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Form, Formik, FormikProps } from "formik";
import * as yup from "yup";
import "./Topic.css";

interface AdminTopicFilterFormProps {
	handleFilter: (filter: TopicFilterRequest) => void;
}

const AdminTopicFilterForm = (props: AdminTopicFilterFormProps) => {
	const { handleFilter } = props;

	const handleSubmit = (values: AdminTopicFilterFormValues) => {
		let filter: TopicFilterRequest = {
			search: values.search,
			isSubtopic: values.isSubtopic,
			isDeleted: values.isDeleted,
		};

		handleFilter(filter);
	};

	const handleIsSubtopicToggle = (
		formik: FormikProps<AdminTopicFilterFormValues>
	) => {
		if (formik.values.isSubtopic) {
			formik.setFieldValue("isSubtopic", undefined);
		} else {
			formik.setFieldValue("isSubtopic", true);
		}
		formik.submitForm();
	};

	const handleIsDeletedToggle = (
		formik: FormikProps<AdminTopicFilterFormValues>
	) => {
		if (formik.values.isDeleted) {
			formik.setFieldValue("isDeleted", undefined);
		} else {
			formik.setFieldValue("isDeleted", true);
		}
		formik.submitForm();
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			{(formik: FormikProps<AdminTopicFilterFormValues>) => (
				<Form className="topic-filter-form">
					<FormTextField name="search" label="Search" />
					<div className="topic-filter-checkbox-container">
						<Checkbox
							id="isSubtopic"
							checkedIcon={
								<CheckBoxOutlined
									style={{
										height: "24px",
										width: "24px",
										color: "rgba(0,0,0,0.6)",
										padding: "6px",
									}}
								/>
							}
							checked={formik.values.isSubtopic}
							style={{
								height: "32px",
								width: "32px",
								color: "rgba(0,0,0,0.6)",
								padding: "6px",
							}}
							onChange={() => handleIsSubtopicToggle(formik)}
						/>
						<Typography variant="h5">Is The Topic a Subtopic</Typography>
					</div>
					<div className="topic-filter-checkbox-container">
						<Checkbox
							id="isDeleted"
							checkedIcon={
								<CheckBoxOutlined
									style={{
										height: "24px",
										width: "24px",
										color: "rgba(0,0,0,0.6)",
										padding: "6px",
									}}
								/>
							}
							checked={formik.values.isDeleted}
							style={{
								height: "32px",
								width: "32px",
								color: "rgba(0,0,0,0.6)",
								padding: "6px",
							}}
							onChange={() => handleIsDeletedToggle(formik)}
						/>
						<Typography variant="h5">Is The Topic Deleted</Typography>
					</div>
					<AutoSubmitToken />
				</Form>
			)}
		</Formik>
	);
};

const initialValues: AdminTopicFilterFormValues = {
	search: "",
	isSubtopic: undefined,
	isDeleted: undefined,
};

const validationSchema = yup.object({
	search: yup.string().trim().max(255),
	isSubtopic: yup.boolean(),
	isDeleted: yup.boolean(),
});

interface AdminTopicFilterFormValues {
	search?: string;
	isSubtopic?: boolean;
	isDeleted?: boolean;
}

export default AdminTopicFilterForm;
