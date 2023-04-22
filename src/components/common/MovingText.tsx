import React from "react";
import "@splidejs/splide/css/skyblue";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "../Components.css";
export default function MovingText() {
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
					<h2 className="slider-content">- Scan bar codes -</h2>
				</SplideSlide>
				<SplideSlide>
					<h2 className="slider-content">- Get information -</h2>
				</SplideSlide>
				<SplideSlide>
					<h2 className="slider-content">- Save your time -</h2>
				</SplideSlide>
				<SplideSlide>
					<h2 className="slider-content">- Save the planet -</h2>
				</SplideSlide>
			</Splide>
		</div>
	);
}
