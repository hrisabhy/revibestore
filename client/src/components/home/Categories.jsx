import { Virtual } from "swiper/modules";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAllCategoriesQuery } from "../../store/services/categoryService";

const Categories = () => {
  const { data, isFetching } = useAllCategoriesQuery();
  console.log(data);
  return isFetching
    ? "Loading..."
    : data?.categories.length > 0 && (
        <Swiper
          modules={[Virtual]}
          spaceBetween={20}
          slidesPerView={3}
          virtual
          className="w-full h-[150px] mb-10"
          breakpoints={{
            0: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1080: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
        >
          {data.categories.map((category, index) => (
            <SwiperSlide
              key={category._id || index} // Use category ID as key if available
              virtualIndex={index}
              className="w-full overflow-hidden rounded-lg relative"
            >
              <img
                src={`./images/slider/${category.imageId || index + 1}.jpg`}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 w-full h-full bg-black/50 flex items-center justify-center p-4">
                <Link
                  to={`/category/${category._id || index + 1}`} // Use category ID in URL if available
                  className="text-white text-base font-medium capitalize"
                >
                  {category.name}
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      );
};

export default Categories;
