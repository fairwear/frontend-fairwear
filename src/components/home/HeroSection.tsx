import { Button, Typography } from "@mui/material";
import "./HomeComponents.css";

interface HeroSectionProps {}

const HeroSection = (props: HeroSectionProps) => {
  return (
    <div className="hero-section-container">
      <div className="cta-container">
        <Typography variant="h1" align="left" className="cta-title">
          Describe what your company does in a few words
        </Typography>
        <Typography variant="body1" align="left" className="cta-description">
          Describe exactly what the company does and what a customer can expect
          when working with the company. Avoid using verbose words or phrases.
        </Typography>
        <Button variant="contained" className="hero-section-button">
          <Typography variant="h5">Some Button</Typography>
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
