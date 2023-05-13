import BrandPostResponse from "@models/brandpost/BrandPostResponse";
import { Typography } from "@mui/material";

interface BrandPostPreviewProps {
	brandPost: BrandPostResponse;
}

const BrandPostPreview = (props: BrandPostPreviewProps) => {
	return (
		<div className="brand-post-preview-container">
			<div className="brand-post-preview">
				<div className="brand-post-preview__header">
					<Typography variant="h5">{props.brandPost.brand.name}</Typography>
					<Typography variant="h4">{props.brandPost.title}</Typography>
				</div>
				<Typography variant="subtitle1" noWrap>
					{props.brandPost.body}
				</Typography>
			</div>
			bruhs
		</div>
	);
};

export default BrandPostPreview;
