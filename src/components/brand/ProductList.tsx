import ItemResponse from "@models/item/ItemResponse";
import { Typography } from "@mui/material";
import { ForwardedRef, forwardRef } from "react";
import "./BrandComponents.css";
import ItemComponent from "./Product";

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
						<ItemComponent key={product.id} item={product} />
					))}
				</div>
			</div>
		);
	}
);

export default ProductList;
