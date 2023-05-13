import BrandPostAPI from "@api/BrandPostAPI";
import DialogHeader from "@components/dialog/DialogHeader";
import CreateReportForm, {
	CreateReportFormValues,
} from "@components/report/CreateReportForm";
import BrandPostResponse from "@models/brandpost/BrandPostResponse";
import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import "./Report.css";
import { FormikHelpers } from "formik";

interface CreateReportDialogProps {
	open: boolean;
	brandPostId: number;
	handleSubmit: (
		values: CreateReportFormValues,
		formikHelpers: FormikHelpers<any>
	) => void;
	handleClose: () => void;
}

const CreateReportDialog = (props: CreateReportDialogProps) => {
	const { open, brandPostId, handleSubmit, handleClose } = props;

	const [brandPost, setBrandPost] = useState<BrandPostResponse | undefined>();

	useEffect(() => {
		getBrandPost();
	}, []);

	const getBrandPost = async () => {
		const brandPost = await BrandPostAPI.findById(brandPostId);
		console.log(brandPost);
		setBrandPost(brandPost);
	};

	return (
		<Dialog
			open={open}
			fullWidth
			className="report-dialog"
			style={{
				backdropFilter: "blur(2px)",
			}}
			PaperProps={{
				style: {
					height: "60%",
					width: "70%",
				},
			}}
		>
			<DialogHeader
				title="Report a Post"
				returnButtonAction={handleClose}
				returnButtonLabel="Cancel"
				containerStyle={{
					width: "calc(100% - 48px)",
				}}
			/>
			{brandPost && (
				<div className="report-dialog__brandpost-preview-container">
					<div className="report-dialog__brandpost-preview">
						BrandPost Preview
					</div>
				</div>
			)}

			<CreateReportForm handleSubmit={handleSubmit} handleClose={handleClose} />
		</Dialog>
	);
};

export default CreateReportDialog;
