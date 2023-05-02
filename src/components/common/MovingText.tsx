import React, { useEffect, useState } from "react";
import "@splidejs/splide/css/skyblue";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "../Components.css";

const getWindowDimensions: any = () => {
	const { innerWidth: width } = window;
	return {
		width,
	};
}

export default function MovingText() {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);
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
					gap: "5px",
					drag: false,
					arrows: false,
					pagination: false,
					perPage: windowDimensions.width > 600 ? 3 : 2,
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
