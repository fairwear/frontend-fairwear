import BrandAPI from "@api/BrandAPI";
import brandLogo from "@assets/images/versace_logo.png";
import BrandResponse from "@models/brand/BrandResponse";
import React from "react";
import "../home/HomeComponents.css";
import BrandComponent from "./BrandComponent";
import "./BrandComponents.css";

export default function BrandList() {
	const [brands, setBrands] = React.useState<BrandResponse[]>([]);
	React.useEffect(() => {
		getBrands();
	}, []);
	const getBrands = async () => {
		let brands = await BrandAPI.findAll();
		setBrands(brands);
	};

	const renderBrands = brands.map((brand) => {
		return (
			<div key={brand.id} className="brand-component-outer-container">
				<BrandComponent
					key={brand.id}
					brand={brand}
					imageUrl={brand.imageUrl || brandLogo}
				/>
			</div>
		);
	});
	return <div className="brand-list-container">{renderBrands}</div>;
}
