import BrandPostComponent from "@components/brandpost/BrandPostComponent";
import BrandPostResponse from "@models/brandpost/BrandPostResponse";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { useEffect, useRef, useState } from "react";
import "./BrandPost.css";
import UserInfoResponse from "@models/user/UserInfoResponse";
interface BrandPostSliderProps {
	brandPosts: BrandPostResponse[];
	userPost: UserInfoResponse;
}

const getWindowDimensions: any = () => {
	const { innerWidth: width } = window;
	return {
		width,
	};
};

const BrandPostSlider = (props: BrandPostSliderProps) => {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);
	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

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
				perPage: 1,
				rewind: false,
				direction: "ttb",
				height: windowDimensions.width > 768 ? 500 : 300,
				gap: 24,
			}}
		>
			<SplideTrack>
				{brandPosts.map((brandPost) => (
					<SplideSlide className="slide-component" key={brandPost.id}>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignContent: "center",
								alignItems: "center",
							}}
						>
							<BrandPostComponent
								brandPost={brandPost}
								userPost={props.userPost}
							/>
						</div>
					</SplideSlide>
				))}
			</SplideTrack>
		</Splide>
	);
};

export default BrandPostSlider;
