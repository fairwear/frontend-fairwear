import BrandComponent from "@components/brand/BrandComponent";
import BrandResponse from "@models/brand/BrandResponse";
import { ButtonProps, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./HomeComponents.css";

interface props extends ButtonProps {
	question: string;
	answer: string;
}
const brandResponses: BrandResponse[] = [
	{
		id: 1,
		name: "Brand 1",
		createdAt: new Date(),
		updatedAt: null,
		deletedAt: null,
	},
	{
		id: 2,
		name: "Brand 2",
		createdAt: new Date(),
		updatedAt: null,
		deletedAt: null,
	},
	{
		id: 3,
		name: "Brand 3",
		createdAt: new Date(),
		updatedAt: new Date(),
		deletedAt: null,
	},
	{
		id: 4,
		name: "Brand 4",
		createdAt: new Date(),
		updatedAt: null,
		deletedAt: null,
	},
];

const BrandSection = () => {
	const [brands, setBrands] = useState<BrandResponse[]>([]);

	useEffect(() => {
		getBrands();
	}, []);

	const getBrands = async () => {
		// let brands = await BrandAPI.findAll();
		// let splitBrands = brands.slice(0, 6);
		// setBrands(splitBrands);
		setBrands(brandResponses);
	};

	return (
		<div className="brand-section-container">
			<div className="title-container">
				<Typography variant="h1">Top Brands</Typography>
				<Typography variant="subtitle1">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				</Typography>
			</div>
			<div className="brand-container">
				{brands.map((brand) => (
					<div key={brand.id} className="brand-component-outer-container">
						<BrandComponent
							key={brand.id}
							brand={brand}
							imageUrl={"src/assets/images/versace_logo.png"}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default BrandSection;
