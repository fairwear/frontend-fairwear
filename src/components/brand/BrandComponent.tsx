import BrandResponse from "@models/brand/BrandResponse";
import { Typography } from "@mui/material";

interface BrandComponentProps {
	brand: BrandResponse;
	imageUrl: string;
}

const BrandComponent = (props: BrandComponentProps) => {
	return (
		<div className='brand-component-container'>
			<img
				className='brand-component-image'
				src={props.imageUrl}
				alt={props.brand.name}
			/>
			<div className='brand-component-text-container'>
				<div className='brand-component-text'>
					<Typography>{props.brand.name}</Typography>
					<Typography variant='subtitle1'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					</Typography>
				</div>
				<Typography variant='h6'>View {props.brand.name}</Typography>
			</div>
		</div>
	);
};

export default BrandComponent;
