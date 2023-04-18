import BrandSection from "../../components/home/BrandSection";
import HeroSection from "../../components/home/HeroSection";
import "./HomePage.css";

const HomePage = () => {
	return (
		<div className='home-page-container'>
			<HeroSection />
			<BrandSection />
		</div>
	);
};

export default HomePage;
