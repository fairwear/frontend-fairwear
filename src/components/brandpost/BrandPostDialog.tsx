import BrandPostComponent from "@components/brandpost/BrandPost";
import DialogHeader from "@components/dialog/DialogHeader";

import BrandPostResponse from "@models/brandpost/BrandPostResponse";
import { Dialog } from "@mui/material";

interface BrandPostDialogProps {
	open: boolean;
	brandPost: BrandPostResponse;
	handleDialogClose: () => void;
}

const BrandPostDialog = (props: BrandPostDialogProps) => {
	const { open, brandPost, handleDialogClose } = props;
	return (
		<Dialog
			open={open}
			onClose={handleDialogClose}
			PaperProps={{
				style: {
					width: "100%",
					borderRadius: "8px",
				},
			}}
		>
			<DialogHeader
				title="View Post"
				containerStyle={{
					width: "100%",
					boxSizing: "border-box",
					backgroundColor: "rgba(242, 237, 237, 0.8)",
				}}
			/>

			<BrandPostComponent brandPost={brandPost} />
		</Dialog>
	);
};

export default BrandPostDialog;
