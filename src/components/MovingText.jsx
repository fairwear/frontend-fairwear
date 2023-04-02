import React from "react";
import "@splidejs/splide/css/skyblue";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "./Components.css";
export default function MovingText() {
  const styles = {
    fontFamily: "Inter",
    fontSize: "2em",
    color: "rgba(36, 36, 36, 0.87)",
  };

  return (
    <Splide
      options={{
        type: "loop",
        gap: "10px",
        drag: "false",
        arrows: false,
        pagination: false,
        perPage: 5,
        autoScroll: {
          pauseOnHover: false,
          pauseOnFocus: false,
          rewind: true,
          speed: 0.8,
        },
      }}
      extensions={{ AutoScroll }}
      style={{
        width: "80%",
      }}
    >
      <SplideSlide>
        <h2
          className="slider-content"
          style={{
            fontFamily: "Inter",
            fontSize: "2em",
            color: "rgba(36, 36, 36, 0.87)",
          }}
        >
          FairWear
        </h2>
      </SplideSlide>
      <SplideSlide>
        <h2 className="slider-content" style={styles}>
          FairWear
        </h2>
      </SplideSlide>
      <SplideSlide>
        <h2 className="slider-content" style={styles}>
          FairWear
        </h2>
      </SplideSlide>
      <SplideSlide>
        <h2 className="slider-content" style={styles}>
          FairWear
        </h2>
      </SplideSlide>
      <SplideSlide>
        <h2 className="slider-content" style={styles}>
          FairWear
        </h2>
      </SplideSlide>
    </Splide>
  );
}
