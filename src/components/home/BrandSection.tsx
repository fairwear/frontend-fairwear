import BrandAPI from "@api/BrandAPI";
import brandLogo from "@assets/images/versace_logo.png";
import BrandComponent from "@components/brand/BrandComponent";
import BrandResponse from "@models/brand/BrandResponse";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeComponents.css";

const BrandSection = () => {
	const [brands, setBrands] = useState<BrandResponse[]>([]);

	const navigate = useNavigate();

	const handleNavigateToBrandList = () => {
		navigate("/brandlist");
	};

	useEffect(() => {
		getBrands();
	}, []);

	const getBrands = async () => {
		let brands = await BrandAPI.findAll();
		let splitBrands = brands.slice(0, 4);
		setBrands(splitBrands);
	};

	return (
		//TODO: Fix or remove brand-section-container class
		// (it's not used as it doesn't exist)
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
						<BrandComponent key={brand.id} brand={brand} imageUrl={brandLogo} />
					</div>
				))}
			</div>
			<div className="view-all-brands-button-container">
				<Button
					variant="outlined"
					className="view-all-brands-button"
					onClick={handleNavigateToBrandList}
				>
					<Typography variant="h6">View All Brands</Typography>
				</Button>
			</div>
		</div>
	);
};

export default BrandSection;
