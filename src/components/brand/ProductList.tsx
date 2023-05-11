import ItemResponse from "@models/item/ItemResponse";
import { Typography } from "@mui/material";
import { ForwardedRef, forwardRef } from "react";
import "./BrandComponents.css";
import Product from "./Product";

interface ProductListProps {
	products: ItemResponse[];
}

const ProductList = forwardRef(
	(props: ProductListProps, ref: ForwardedRef<HTMLDivElement>) => {
		const { products } = props;

		return (
			<div className="product-section-container" ref={ref}>
				<div className="product-section-header">
					<Typography variant="h1">Products</Typography>
				</div>
				<div className="grid-container">
					{products.map((product) => (
						<Product
							key={product.id}
							imageUrl={product.imageUrl}
							name={product.name}
						/>
					))}
				</div>
			</div>
		);
	}
);

export default ProductList;
