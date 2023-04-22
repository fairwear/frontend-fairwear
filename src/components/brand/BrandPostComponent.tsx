import BrandPostResponse from "@models/brandpost/BrandPostResponse";

interface BrandPostComponentProps {
	brandPost: BrandPostResponse;
}

const BrandPostComponent = (props: BrandPostComponentProps) => {
	return (
		<div className="brand-post-container">
			<div></div>
		</div>
	);
};

export default BrandPostComponent;
