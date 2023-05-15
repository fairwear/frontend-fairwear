import FaqSection from "@components/home/FaqSection";
import BrandSection from "../../components/home/BrandSection";
import HeroSection from "../../components/home/HeroSection";
import "./HomePage.css";
import SubHeader from "@components/common/SubHeader";
import FeaturedPostsSection from "@components/home/FeaturedPostsSection";
import Footer from "@components/common/Footer";

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
