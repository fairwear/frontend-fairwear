import React from "react";
import "@splidejs/splide/css/skyblue";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "../Components.css";
export default function BrandListMovingText() {
	return (
		<div
			style={{
				maxWidth: "calc(100vw - 10px)",
				marginTop: "16px",
			}}
		>
			<Splide
				options={{
					type: "loop",
					gap: "15px",
					drag: false,
					arrows: false,
					pagination: false,
					perPage: 4,
					autoScroll: {
						pauseOnHover: false,
						pauseOnFocus: false,
						rewind: true,
						speed: 0.78,
					},
				}}
				extensions={{ AutoScroll }}
			>
				<SplideSlide>
					<h2 className="slider-content">- Uploaded Brands -</h2>
				</SplideSlide>
				<SplideSlide>
					<h2 className="slider-content">- Cant Find Specific -</h2>
				</SplideSlide>
				<SplideSlide>
					<h2 className="slider-content">- Login/SignUp-</h2>
				</SplideSlide>
				<SplideSlide>
					<h2 className="slider-content">- Upload it ! -</h2>
				</SplideSlide>
			</Splide>
		</div>
	);
}
