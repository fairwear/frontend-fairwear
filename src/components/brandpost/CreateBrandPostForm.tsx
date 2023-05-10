import BrandAPI from "@api/BrandAPI";
import DialogFooter from "@components/dialog/DialogFooter";
import FormAutocomplete from "@components/form/FormAutoComplete";
import FormTextField from "@components/form/FormTextField";
import BrandResponse from "@models/brand/BrandResponse";
import BrandPostToTopicEntry from "@models/brandpost/BrandPostToTopicEntry";
import BrandPostReferenceCreateRequest from "@models/brandpostreference/BrandPostReferenceCreateRequest";
import {
	Autocomplete,
	Box,
	Chip,
	DialogContent,
	ListItemText,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import "./BrandPost.css";
import TopicAPI from "@api/TopicAPI";
import TopicResponse from "@models/topic/TopicResponse";
import TopicFormComponent from "@components/topic/TopicFormComponent";
import AppTheme from "../../AppTheme";
import { HelpRounded } from "@mui/icons-material";
import "../form/FormComponents.css";

interface CreateBrandPostFormProps {
	handleFormSubmit: (values: CreateBrandPostFormValues) => void;
	handleDialogClose: () => void;
}

// TODO: Think about adding steps to this form (StepperComponent)
const CreateBrandPostForm = (props: CreateBrandPostFormProps) => {
	const { handleFormSubmit, handleDialogClose } = props;

	const [brands, setBrands] = useState<BrandResponse[]>([]);
	const [topics, setTopics] = useState<TopicResponse[]>([]);
	const [chosenTopics, setChosenTopics] = useState<TopicResponse[]>([]);
	const [references, setReferences] = useState<
		BrandPostReferenceCreateRequest[]
	>([]);
	const [selectedTopics, setSelectedTopics] = useState<BrandPostToTopicEntry[]>(
		[]
	);

	useEffect(() => {
		getBrands();
		getTopics();
	}, []);

	const getBrands = async () => {
		let response = await BrandAPI.findAll();
		setBrands(response);
	};

	const getTopics = async () => {
		const topics = await TopicAPI.findAll();
		setTopics(topics);
	};

	const handleTopicChange = (newValue: BrandPostToTopicEntry) => {
		console.log(selectedTopics);
		const existingTopic = selectedTopics.find(
			(topic) => topic.topicId === newValue.topicId
		);
		if (!existingTopic) {
			setSelectedTopics((prevTopics) => [...prevTopics, newValue]);
		} else {
			const filteredTopics = selectedTopics.filter(
				(topic) => topic.topicId !== newValue.topicId
			);
			setSelectedTopics([...filteredTopics, newValue]);
		}
	};

	const handleRemoveTopic = (topicId: number, formik: FormikProps<any>) => {
		setChosenTopics(chosenTopics.filter((topic) => topic.id !== topicId));
		formik.values.topics = formik.values.topics.filter(
			(topic: TopicResponse) => topic.id !== topicId
		);
		setSelectedTopics(
			selectedTopics.filter((topic) => topic.topicId !== topicId)
		);
	};

	const handleChange = (newValue: TopicResponse[]) => {
		setChosenTopics(newValue);
	};

	const brandNames = brands.map((brand) => brand.name);

	const handleSubmit = (
		values: CreateBrandPostFormValues,
		formik: FormikHelpers<any>
	) => {
		let brand = brands.find((brand) => brand.name === values.brandName);
		values.selectedTopics = selectedTopics;
		values.references = [];

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
						<div
							//TODO: Remove this temp styling
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "8px",
							}}
						>
							<div className="textfield-title-container">
								<Typography color={AppTheme.palette.text.primary} variant="h5">
									Topics
								</Typography>

								<Tooltip title="Select which topics you'd like to hightlight and make a post about">
									<HelpRounded className="textfield-tooltip" />
								</Tooltip>
							</div>
							<Autocomplete
								id="topics"
								options={topics}
								multiple={true}
								value={formik.values.topics}
								disableClearable
								autoHighlight
								onChange={(event: any, newValue: TopicResponse[]) => {
									handleChange(newValue);
									formik.setFieldValue("topics", newValue);
								}}
								renderTags={(value: TopicResponse[], getTagProps: any) =>
									value.map((option: TopicResponse, index: number) => (
										<Chip
											variant="outlined"
											label={option.name}
											{...getTagProps({ index })}
										/>
									))
								}
								getOptionLabel={(option: TopicResponse) => option.name}
								isOptionEqualToValue={(
									option: TopicResponse,
									value: TopicResponse
								) => option.id === value.id}
								renderOption={(props: any, option: TopicResponse) => (
									<div key={option.id}>
										<Box component="li" {...props} key={option}>
											<ListItemText
												style={{
													padding: "0px",
												}}
											>
												<Typography variant="body1">{option.name}</Typography>
											</ListItemText>
										</Box>
									</div>
								)}
								renderInput={(params) => (
									<TextField
										{...params}
										value={formik.values.topicNames}
										name="topicNames"
										fullWidth
										placeholder="What topics are you talking about?"
										error={
											formik.values.topicNames &&
											Boolean(formik.values.topicNames.error)
										}
										InputLabelProps={{
											...params.InputLabelProps,
										}}
										InputProps={{
											...params.InputProps,
										}}
									/>
								)}
							/>
							{chosenTopics.length > 0 && (
								<div className="selected-topics-container">
									{chosenTopics.map((topic) => (
										<TopicFormComponent
											key={topic.id}
											name="selectedTopics"
											topic={topic}
											handleDeleteTopic={(topicId: number) => {
												handleRemoveTopic(topicId, formik);
											}}
											handleTopicChange={handleTopicChange}
										/>
									))}
								</div>
							)}
						</div>
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
	topicNames: TopicResponse[];
	topics: TopicResponse[];
	selectedTopics: BrandPostToTopicEntry[];
	references: BrandPostReferenceCreateRequest[];
	itemIds: string[];
}

const initialValues: CreateBrandPostFormValues = {
	title: "",
	body: "",
	brandId: -1,
	brandName: "",
	topics: [],
	topicNames: [],
	selectedTopics: [],
	references: [],
	itemIds: [],
};

const validationSchema = yup.object({
	title: yup.string().required("Title is required"),
	body: yup.string().required("Body is required"),
	brandId: yup.number().nullable(),
	brandName: yup.string().required("Please choose a brand"),
	topics: yup.array().required("Please choose at least one topic"),
	topicNames: yup.array().required("Please choose at least one topic"),
	selectedTopics: yup.array().optional(),
	references: yup.array().optional(),
	itemIds: yup.array().optional(),
});

export default CreateBrandPostForm;
