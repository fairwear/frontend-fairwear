import TopicAPI from "@api/TopicAPI";
import FormTextField from "@components/form/FormTextField";
import TopicCreateRequest from "@models/topic/TopicCreateRequest";
import TopicResponse from "@models/topic/TopicResponse";
import TopicUpdateRequest from "@models/topic/TopicUpdateRequest";
import { CheckBoxOutlined } from "@mui/icons-material";
import { Button, Checkbox, CircularProgress, Typography } from "@mui/material";
import alerts from "@redux/alerts";
import { AlertValue } from "@redux/store/alert/AlertState";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import * as yup from "yup";
import "./Topic.css";

export interface CreateUpdateTopicFormValues {
	name: string;
	isSubTopic?: boolean;
	parentTopicId?: number;
}

interface CreateUpdateTopicFormProps {
	state: "edit" | "create";
	topic?: TopicResponse;
	handleClose: () => void;
}

const CreateUpdateTopicForm = (props: CreateUpdateTopicFormProps) => {
	const { state, topic, handleClose } = props;

	const handleToggle = (formik: FormikProps<CreateUpdateTopicFormValues>) => {
		formik.setFieldValue("isSubTopic", !formik.values.isSubTopic);
		formik.validateForm();
	};

	const initialValues: CreateUpdateTopicFormValues = {
		name: topic?.name || "",
		isSubTopic: topic?.topicId ? true : false,
		parentTopicId: topic?.topicId || undefined,
	};

	const handleFormSubmit = async (
		values: CreateUpdateTopicFormValues,
		formik: FormikHelpers<CreateUpdateTopicFormValues>
	) => {
		if (state === "create") {
			const request: TopicCreateRequest = {
				name: values.name,
				topicId: values.parentTopicId,
				createdAt: new Date(),
			};
			await TopicAPI.create(request);
			const newAlert: AlertValue = {
				isOpen: true,
				message: "Topic created successfully",
				alertSeverity: "success",
				alertType: "toast",
			};
			alerts.addAlert(newAlert);
		} else if (state === "edit") {
			const request: TopicUpdateRequest = {
				id: topic?.id || 0,
				name: values.name,
				topicId: values.parentTopicId,
				updatedAt: new Date(),
			};
			await TopicAPI.update(request);
			const newAlert: AlertValue = {
				isOpen: true,
				message: "Topic updated successfully",
				alertSeverity: "success",
				alertType: "toast",
			};
			alerts.addAlert(newAlert);
		}
		setTimeout(() => {
			formik.setSubmitting(false);
		}, 300);

		handleClose();
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleFormSubmit}
			validationSchema={validationSchema}
			enableReinitialize
		>
			{(formik: FormikProps<CreateUpdateTopicFormValues>) => (
				<Form className="topic-form">
					<FormTextField
						required
						name="name"
						title="Topic Name"
						placeholder="The name of the topic"
					/>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "flex-start",
							gap: "8px",
							width: "100%",
						}}
					>
						<Checkbox
							id="isSubTopic"
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
							checked={formik.values.isSubTopic}
							style={{
								height: "32px",
								width: "32px",
								color: "rgba(0,0,0,0.6)",
								padding: "6px",
							}}
							onChange={() => handleToggle(formik)}
						/>
						<Typography variant="h5">Is The Topic a Subtopic</Typography>
					</div>
					{formik.values.isSubTopic && (
						<FormTextField
							required
							name="parentTopicId"
							title="Parent Topic"
							placeholder="The parent topic ID"
						/>
					)}
					<div
						style={{
							width: "100%",

							display: "flex",
							justifyContent: "flex-end",
						}}
					>
						<Button
							style={{
								marginTop: "48px",
								padding: "8px 12px",
								width: "70%",
								alignSelf: "flex-end",
							}}
							disabled={!formik.isValid}
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
								<Typography variant="h4">
									{state === "create" ? "Create Topic" : "Update Topic"}
								</Typography>
							)}
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

const validationSchema = yup.object({
	name: yup.string().required("Topic name is required"),
	isSubTopic: yup.boolean().optional(),
	parentTopicId: yup
		.number()
		// .when("isSubTopic", (isSubTopic, schema) => {
		// 	if (isSubTopic)
		// 		return schema.required("Parent Topic id is required");
		// 	return schema;
		// })
		.typeError("Parent Topic id must be a number"),
});

export default CreateUpdateTopicForm;
