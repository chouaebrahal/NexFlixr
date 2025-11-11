import Hero from "../sections/Hero";
import Trends from "../sections/Trends";
import MoviesSection from "../sections/MoviesSection";
import TvSection from "../sections/TvSection";
import PricingSection from "../sections/PricingSection";
import Persons from "../sections/Persons";
import FaqSection from "../sections/FaqSection";

const Home = () => {
 
  return (
    <main>
      <Hero />
      <Trends /> 
      <MoviesSection />
      <TvSection />
      <PricingSection />
      <Persons />
      <FaqSection /> 
    </main>
  );
};

export default Home;
