import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";
import HotFlat from "@/components/UI/HomePage/HotFlat/HotFlat";
import HowItWorks from "@/components/UI/HomePage/HowItWorks/HowItWorks";
import SearchBox from "@/components/UI/HomePage/SearchBox/SearchBox";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <SearchBox />
      <HotFlat />
      <HowItWorks />
    </>
  );
};

export default HomePage;
