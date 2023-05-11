import { Button, Typography } from "@mui/material";
import "./HomeComponents.css";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {}

const HeroSection = (props: HeroSectionProps) => {
	const navigate = useNavigate();
	return (
		<div className="hero-section-container">
			<div className="cta-container">
				<Typography variant="h1" align="left" className="cta-title">
					Describe what your company does in a few words
				</Typography>
				<Typography variant="body1" align="left" className="cta-description">
					Describe exactly what the company does and what a customer can expect
					when working with the company. Try scanning a barcode with your
					camera!
				</Typography>
				<Button
					variant="contained"
					className="hero-section-button"
					onClick={() => navigate("/scan")}
				>
					<Typography variant="h5">Let me scan!</Typography>
				</Button>
			</div>
		</div>
	);
};

export default HeroSection;
