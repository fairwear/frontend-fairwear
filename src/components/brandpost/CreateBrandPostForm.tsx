import BrandAPI from "@api/BrandAPI";
import TopicAPI from "@api/TopicAPI";
import ReferenceComponent from "@components/brandpost/ReferenceComponent";
import DialogFooter from "@components/dialog/DialogFooter";
import FormAutocomplete from "@components/form/FormAutoComplete";
import FormTextField from "@components/form/FormTextField";
import TopicFormComponent from "@components/topic/TopicFormComponent";
import BrandResponse from "@models/brand/BrandResponse";
import BrandPostToTopicEntry from "@models/brandpost/BrandPostToTopicEntry";
import TopicResponse from "@models/topic/TopicResponse";
import { ErrorRounded, HelpRounded } from "@mui/icons-material";
import {
	Autocomplete,
	Box,
	Chip,
	DialogContent,
	Divider,
	ListItemText,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import AppTheme from "../../AppTheme";
import "../form/FormComponents.css";
import "./BrandPost.css";

interface CreateBrandPostFormProps {
	handleFormSubmit: (values: CreateBrandPostFormValues) => void;
	handleDialogClose: () => void;
}

const CreateBrandPostForm = (props: CreateBrandPostFormProps) => {
	const { handleFormSubmit, handleDialogClose } = props;

	const [brands, setBrands] = useState<BrandResponse[]>([]);
	const [sourceUrls, setSourceUrls] = useState<string[]>([]);
	const [topics, setTopics] = useState<TopicResponse[]>([]);
	const [chosenTopics, setChosenTopics] = useState<TopicResponse[]>([]);
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

	const handleReferenceChange = (newValue: string[]) => {
		setSourceUrls(newValue);
	};

	const handleTopicChange = (newValue: BrandPostToTopicEntry) => {
		const existingTopic = selectedTopics.find(
			(topic) => topic.topicId === newValue.topicId
		);
		if (!existingTopic) {
			setSelectedTopics((prevTopics) => [...prevTopics, newValue]);
		} else {
			setSelectedTopics((prevTopics) =>
				prevTopics.map((topic) =>
					topic.topicId === newValue.topicId ? newValue : topic
				)
			);
		}
	};

	const handleRemoveTopic = (
		topicId: number,
		formik: FormikProps<CreateBrandPostFormValues>
	) => {
		setChosenTopics(chosenTopics.filter((topic) => topic.id !== topicId));
		formik.values.topics = formik.values.topics.filter(
			(topic: TopicResponse) => topic.id !== topicId
		);

		let newValue = selectedTopics.filter((topic) => topic.topicId !== topicId);
		setSelectedTopics(newValue);

		formik.setFieldValue(
			"topicNames",
			chosenTopics
				.filter((topic) => topic.id !== topicId)
				.map((topic) => topic.name)
		);
	};

	const handleChange = (newValue: TopicResponse[]) => {
		setChosenTopics(newValue);
		if (newValue.length > selectedTopics.length) {
			const newTopic = newValue.filter(
				(topic) =>
					!selectedTopics.find(
						(selectedTopic) => selectedTopic.topicId === topic.id
					)
			)[0];
			const newBrandPostToTopicEntry: BrandPostToTopicEntry = {
				topicId: newTopic.id,
				isBad: false,
			};
			handleTopicChange(newBrandPostToTopicEntry);
		}
	};

	const brandNames = brands.map((brand) => brand.name);

	const handleSubmit = (
		values: CreateBrandPostFormValues,
		formik: FormikHelpers<CreateBrandPostFormValues>
	) => {
		let brand = brands.find((brand) => brand.name === values.brandName);
		values.selectedTopics = selectedTopics;
		if (brand) {
			values.brandId = brand.id;
			handleFormSubmit(values);
		} else {
			formik.setSubmitting(false);
			formik.setErrors({
				brandName: "Brand does not exist",
			});
		}
	};

	const validationSchema = yup.object({
		title: yup
			.string()
			.required("Title is required")
			.min(5, "Title must be atleast 5 charachters long")
			.max(100, "Title must be less than 100 charachters long"),
		body: yup
			.string()
			.required("Body is required")
			.min(10, "Body must be atleast 10 charachters long")
			.max(1000, "Body must be less than 1000 charachters long"),
		brandId: yup.number().nullable(),
		brandName: yup
			.string()
			.required("Please choose a brand")
			.oneOf(brandNames, "Please choose an existing brand"),
		topics: yup
			.array()
			.of(yup.object())
			.min(1, "Please choose at least one topic"),
		selectedTopics: yup
			.array()
			.of(
				yup.object().shape({
					topicId: yup.number().required(),
					isBad: yup.boolean().required(),
				})
			)
			.optional(),
		itemIds: yup.array().optional(),
		topicNames: yup
			.array()
			.of(yup.string().required("lol"))
			.required("Please choose at least one topic"),

		sourceUrls: yup
			.array()
			.of(
				yup.string().nullable().matches(urlRegex, "Please enter a valid link")
			)
			.optional(),
	});

	return (
		<Formik
			onSubmit={handleSubmit}
			validationSchema={validationSchema}
			initialValues={initialValues}
		>
			{(formik: FormikProps<CreateBrandPostFormValues>) => (
				<Form className="create-brandpost-form">
					<DialogContent className="dialog-content">
						<FormTextField
							required
							title="Post Title"
							name="title"
							placeholder="What will be title of your post?"
						/>
						<FormTextField
							required
							title="Post Body"
							name="body"
							placeholder="What is your post about?"
							multiline
							maxRows={6}
						/>
						<FormAutocomplete
							required
							name="brandName"
							options={brandNames}
							title="Brand"
							placeholder="What brand is this post about?"
							variant="outlined"
						/>
						<Divider />
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "8px",
							}}
						>
							<div className="textfield-title-container">
								<Typography color={AppTheme.palette.text.primary} variant="h5">
									Topics*
								</Typography>

								<Tooltip title="Select which topics you'd like to highlight and make a post about">
									<HelpRounded className="textfield-tooltip" />
								</Tooltip>
							</div>
							{/* TODO: Export this component to a separate file */}

							<Autocomplete
								id="topics"
								options={topics}
								multiple={true}
								componentName="topics"
								value={formik.values.topics}
								disableClearable
								clearOnBlur
								disableCloseOnSelect
								autoHighlight
								getOptionDisabled={(option: TopicResponse) =>
									chosenTopics.length > 4 ||
									chosenTopics.some((topic) => topic.id === option.id)
								}
								onInputChange={(event: any, newValue: string) => {
									formik.validateField("topics");
								}}
								onChange={(event: any, newValue: TopicResponse[]) => {
									formik.setFieldValue("topics", newValue);
									formik.setFieldTouched("topics", true);

									formik.setFieldValue(
										"topicNames",
										newValue.map((topic) => topic.name)
									);

									handleChange(newValue);
								}}
								onBlur={() => formik.validateField("topics")}
								renderTags={(value: TopicResponse[], getTagProps: any) =>
									value.map((option: TopicResponse, index: number) => (
										<Chip
											variant="outlined"
											label={option.name}
											{...getTagProps({ index })}
											onDelete={() => handleRemoveTopic(option.id, formik)}
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
										name="topicNames"
										value={formik.values.topicNames}
										onChange={(event: any) => {
											formik.validateField("topics");
										}}
										placeholder="What topics are relevant in your post?"
										error={
											formik.touched.topics && Boolean(formik.errors.topics)
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
							{formik.touched.topics && Boolean(formik.errors.topics) && (
								<Box className="textfield-error-container">
									<ErrorRounded className="textfield-error-icon" />

									<Typography
										variant="subtitle1"
										color="#C62828"
										align="left"
									>
										{formik.getFieldMeta("topics").error}
									</Typography>
								</Box>
							)}
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
						<Divider />
						<ReferenceComponent
							name="sourceUrls"
							sourceUrls={sourceUrls}
							handleChange={handleReferenceChange}
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
	topics: TopicResponse[];
	selectedTopics: BrandPostToTopicEntry[];
	itemIds: string[];
	topicNames: string[];
	sourceUrls?: string[];
}

const initialValues: CreateBrandPostFormValues = {
	title: "",
	body: "",
	brandId: -1,
	brandName: "",
	topics: [],
	selectedTopics: [],
	itemIds: [],
	topicNames: [],
	sourceUrls: [],
};

const urlRegex =
	/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

export default CreateBrandPostForm;
