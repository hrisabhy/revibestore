import Categories from "../../components/home/Categories";
import Nav from "../../components/home/Nav";
import Slider from "../../components/home/Slider";
import HomeProduct from "../../components/home/HomeProduct";
import { useRandomCategoriesQuery } from "../../store/services/categoryService";
import AboutSection from "../../components/home/AboutSection";
import Contact from "../../components/home/Contact";
import Footer from "../../components/home/Footer";
const Home = () => {
  const { data, isFetching } = useRandomCategoriesQuery();
  return (
    <>
      <Nav />
      <div className="mt-[70px]">
        <Slider />
      </div>
      <div className="my-container mt-10">
        <Categories />
        {!isFetching &&
          data?.categories?.length > 0 &&
          data?.categories.map((category) => (
            <HomeProduct category={category} key={category._id} />
          ))}
      </div>
      <AboutSection />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
