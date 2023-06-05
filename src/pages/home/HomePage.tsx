import SubHeader from "@components/common/SubHeader";
import FaqSection from "@components/home/FaqSection";
import FeaturedPostsSection from "@components/home/FeaturedPostsSection";
import BrandSection from "../../components/home/BrandSection";
import HeroSection from "../../components/home/HeroSection";
import "./HomePage.css";

const HomePage = () => {
	return (
		<div className="home-page-container">
			<SubHeader />
			<HeroSection />
			<FeaturedPostsSection />
			<BrandSection />
			<FaqSection />
			{/* <Footer /> */}
		</div>
	);
};

export default HomePage;
