import BrandPostComponent from "@components/brandpost/BrandPostComponent";
import BrandPostResponse from "@models/brandpost/BrandPostResponse";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { useEffect, useRef, useState } from "react";

interface BrandPostSliderProps {
	brandPosts: BrandPostResponse[];
}

const BrandPostSlider = (props: BrandPostSliderProps) => {
	const { brandPosts } = props;

	const slideRef = useRef<any | null>(null);

	const [padding, setPadding] = useState({ right: "5%", left: "0" });

	useEffect(() => {
		slideRef?.current?.splide.on("moved", () => {
			const currentIndex = slideRef?.current?.splide.index;
			const slideLength = slideRef?.current?.splide.length;

			if (slideLength - currentIndex === 5) {
				setPadding({ right: "0", left: "5%" });
			} else if (currentIndex === 0) {
				setPadding({ right: "5%", left: "0" });
			}
		});
	});
	return (
		<Splide
			ref={slideRef}
			hasTrack={false}
			options={{
				arrows: false,
				type: "slide",
				gap: "16px",
				perPage: 3,
				pagination: false,
				perMove: 1,
				wheel: false,
				padding: { right: "7%" },
				speed: 800,
			}}
		>
			<SplideTrack>
				{brandPosts.map((brandPost) => (
					<SplideSlide key={brandPost.id}>
						<BrandPostComponent brandPost={brandPost} />
					</SplideSlide>
				))}
			</SplideTrack>
		</Splide>
	);
};

export default BrandPostSlider;
