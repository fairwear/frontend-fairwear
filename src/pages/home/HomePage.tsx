import FaqSection from "@components/home/FaqSection";
import BrandSection from "../../components/home/BrandSection";
import HeroSection from "../../components/home/HeroSection";
import "./HomePage.css";
import FeaturedPostsSection from "@components/home/FeaturedPostsSection";

const HomePage = () => {
	return (
		<div className="home-page-container">
			<HeroSection />
			<FeaturedPostsSection />
			<BrandSection />
			<FaqSection />
		</div>
	);
};

export default HomePage;
