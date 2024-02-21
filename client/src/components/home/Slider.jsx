import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
const Slider = () => {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      <SwiperSlide className="slide">
        <div className="slide-img bg-[url('../public/images/slider/1.jpg')] bg-center no-repeat"></div>
      </SwiperSlide>
      <SwiperSlide className="slide">
        <div className="slide-img bg-[url('../public/images/slider/2.jpg')] bg-center no-repeat"></div>
      </SwiperSlide>
      <SwiperSlide className="slide">
        <div className="slide-img bg-[url('../public/images/slider/3.jpg')] bg-center no-repeat"></div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
