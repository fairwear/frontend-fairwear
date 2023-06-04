import AutoSubmitToken from "@components/form/AutoSubmitToken";
import FormAutocomplete from "@components/form/FormAutoComplete";
import ReportFilterRequest from "@models/report/ReportFilterRequest";
import ReportResultEnum from "@models/report/ReportResultEnum";
import ReportStatusEnum from "@models/report/ReportStatusEnum";
import { Form, Formik, FormikProps } from "formik";
import { useState } from "react";
import * as yup from "yup";
import "./Report.css";

const maxWidthForFilterFieldLabel = 600;

interface AdminReportFilterFormProps {
	handleFilter: (filter?: ReportFilterRequest) => void;
}

const AdminReportFilterForm = (props: AdminReportFilterFormProps) => {
	const { handleFilter } = props;

	const [width, setWidth] = useState(window.innerWidth);

	window.addEventListener("resize", () => setWidth(window.innerWidth));

	const reportStatusOptions = Object.keys(ReportStatusEnum);
	const reportResultOptions = Object.keys(ReportResultEnum);

	const handleSubmit = (values: AdminReportFilterFormValues) => {
		let filter: ReportFilterRequest = {
			status: values.status === "" ? undefined : values.status,
			result: values.result === "" ? undefined : values.result,
		};

		handleFilter(filter);
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema(
				reportStatusOptions,
				reportResultOptions
			)}
			onSubmit={handleSubmit}
		>
			{(formik: FormikProps<AdminReportFilterFormValues>) => (
				<Form className="report-filter-form">
					<FormAutocomplete
						name="status"
						variant="outlined"
						options={reportStatusOptions}
						label={"Report status"}
						title={width < maxWidthForFilterFieldLabel ? "Report status" : ""}
					/>
					<FormAutocomplete
						name="result"
						variant="outlined"
						options={reportResultOptions}
						label={"Report status"}
						title={width < maxWidthForFilterFieldLabel ? "Report status" : ""}
					/>
					<AutoSubmitToken />
				</Form>
			)}
		</Formik>
	);
};

export interface AdminReportFilterFormValues {
	status: ReportStatusEnum | "";
	result: ReportResultEnum | "";
}

const initialValues: AdminReportFilterFormValues = {
	status: "",
	result: "",
};

const validationSchema = (statusOptions: string[], resultOptions: string[]) =>
	yup.object({
		status: yup.string().optional().nullable().oneOf(statusOptions),
		result: yup.string().optional().nullable().oneOf(resultOptions),
	});

export default AdminReportFilterForm;
