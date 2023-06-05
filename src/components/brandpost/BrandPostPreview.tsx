import VoteComponent from "@components/brandpost/VoteComponent";
import BrandPostResponse from "@models/brandpost/BrandPostResponse";
import { Typography } from "@mui/material";
import "./BrandPost.css";

interface BrandPostPreviewProps {
	brandPost: BrandPostResponse;
}

const BrandPostPreview = (props: BrandPostPreviewProps) => {
	return (
		<div className="brand-post-preview-container">
			<div className="brand-post-preview">
				<div className="brand-post-preview__header">
					<Typography variant="h5" fontWeight={800}>
						{props.brandPost.brand.name}
					</Typography>
					<Typography variant="h4">{props.brandPost.title}</Typography>
				</div>
				<Typography variant="subtitle1" noWrap>
					{props.brandPost.body}
				</Typography>
			</div>
			<VoteComponent brandPostId={props.brandPost.id} />
		</div>
	);
};

export default BrandPostPreview;
