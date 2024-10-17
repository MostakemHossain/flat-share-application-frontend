import AboutSection from "@/components/UI/HomePage/AboutUs/AboutUs";
import FeatureFlatSection from "@/components/UI/HomePage/FeatureFlat/FeatureFlat";
import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";
import HotFlat from "@/components/UI/HomePage/HotFlat/HotFlat";
import HowItWorks from "@/components/UI/HomePage/HowItWorks/HowItWorks";
import JoinAgent from "@/components/UI/HomePage/JoinAgent/JoinAgent";
import SearchBox from "@/components/UI/HomePage/SearchBox/SearchBox";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <HotFlat />
      <AboutSection />
      <FeatureFlatSection/>
      <HowItWorks />
      <JoinAgent />
    </>
  );
};

export default HomePage;
