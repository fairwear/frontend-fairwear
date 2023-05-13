import FormAutocomplete from "@components/form/FormAutoComplete";
import FormTextField from "@components/form/FormTextField";
import FormikUseEffect from "@components/form/FormikUseEffect";
import ReportReasonEnum from "@models/report/ReportReasonEnum";
import { Button, CircularProgress, Typography } from "@mui/material";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import "./Report.css";

interface CreateReportFormProps {
	handleSubmit: (
		values: CreateReportFormValues,
		formikHelpers: FormikHelpers<any>
	) => void;
	handleClose: () => void;
}

const CreateReportForm = (props: CreateReportFormProps) => {
	const { handleSubmit } = props;

	const [isReasonOther, setIsReasonOther] = useState<boolean>(false);

	useEffect(() => {
		handleSelectReason(initialValues.reportReason);
	}, []);

	const handleSelectReason = (reason: string) => {
		if (reason === ReportReasonEnum.OTHER) {
			setIsReasonOther(true);
		} else {
			setIsReasonOther(false);
		}
	};

	const handleFormSubmit = (
		values: CreateReportFormValues,
		formikHelpers: FormikHelpers<any>
	) => {
		if (
			values.reportReason === ReportReasonEnum.OTHER &&
			values.otherReportReason
		) {
			values.reportReason = values.otherReportReason;
		}

		handleSubmit(values, formikHelpers);
		setTimeout(() => {
			formikHelpers.setSubmitting(false);
		}, 500);
	};

	const reportReasons = Object.values(ReportReasonEnum);

	return (
		<Formik
			onSubmit={handleFormSubmit}
			initialValues={initialValues}
			validationSchema={validationSchema}
			enableReinitialize
		>
			{(formik: FormikProps<CreateReportFormValues>) => (
				<Form className="report-form">
					<FormAutocomplete
						value={formik.values.reportReason}
						required
						name="reportReason"
						options={reportReasons}
						variant="outlined"
						label="Report Reason"
						placeholder="Select a reason"
					/>
					{isReasonOther && (
						<FormTextField
							value={formik.values.otherReportReason}
							name="otherReportReason"
							label="Report Reason"
							placeholder="Please specify the reason"
						/>
					)}

					<FormTextField
						name="comment"
						value={formik.values.comment}
						label="Comment"
						placeholder="Elaborate on what's wrong with the post..."
					/>
					<FormikUseEffect
						value={formik.values.reportReason}
						actionOnUpdate={() =>
							handleSelectReason(formik.values.reportReason)
						}
					/>
					<Button
						style={{
							marginTop: "auto",
							padding: "8px 12px",
							width: "60%",
							alignSelf: "flex-end",
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
							<Typography variant="h4">Report</Typography>
						)}
					</Button>
				</Form>
			)}
		</Formik>
	);
};

export interface CreateReportFormValues {
	reportReason: ReportReasonEnum | string;
	otherReportReason?: string;
	comment?: string;
}

const initialValues: CreateReportFormValues = {
	reportReason: "",
	comment: "",
};

const validationSchema = yup.object({
	reportReason: yup.string().required("Please select a reason"),
	otherReportReason: yup.string().when("reportReason", {
		is: ReportReasonEnum.OTHER,
		then: (schema) => schema.required("Please specify the reason"),
		otherwise: (schema) => schema.optional(),
	}),
	comment: yup.string().optional(),
});

export default CreateReportForm;
