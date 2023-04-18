import BrandAPI from "@api/BrandAPI";
import BrandResponse from "@models/brand/BrandResponse";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./HomeComponents.css";

const BrandSection = () => {
	const [brands, setBrands] = useState<BrandResponse[]>([]);

	useEffect(() => {
		getBrands();
	}, []);

	const getBrands = async () => {
		let brands = await BrandAPI.findAll();
		let splitBrands = brands.slice(0, 6);
		setBrands(splitBrands);
	};

	return (
		<div className='brand-section-container'>
			<div className='title-container'>
				<Typography variant='h1'>Top Brands</Typography>
				<Typography variant='subtitle1'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				</Typography>
			</div>
			{brands.map((brand) => (
				<div key={brand.id} className='brand-container'>
					{/* temp solution */}
					{brand.id}
				</div>
			))}
		</div>
	);
};

export default BrandSection;
