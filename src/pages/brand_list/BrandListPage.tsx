import BrandList from "@components/brand/BrandList";
import BrandListHeader from "@components/brand/BrandListHeader";
import BrandListMovingText from "@components/common/BrandListMovingText";

export default function BrandListPage() {
	return (
		<div>
			<BrandListHeader />
			<BrandListMovingText />
			<BrandList />
		</div>
	);
}
