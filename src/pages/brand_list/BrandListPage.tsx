import BrandList from "@components/brand/BrandList";
import BrandListHeader from "@components/brand/BrandListHeader";
import BrandListMovingText from "@components/common/BrandListMovingText";
import "./BrandListPage.css";
export default function BrandListPage() {
	return (
		<div className="brand-list-page-container">
			<BrandListHeader />
			<div style={{ width: "80%" }}>
				<BrandListMovingText />
			</div>
			<BrandList />
		</div>
	);
}
