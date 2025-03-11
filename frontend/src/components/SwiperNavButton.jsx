import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import { useSwiper } from "swiper/react";

const SwiperNavButton = () => {
  const swiper = useSwiper();
  return (
    <div className="absolute top-1/2 -translate-y-4/5 left-0 right-0 flex justify-between z-50">
      <button
        onClick={() => swiper.slidePrev()}
        className=" bg-black/50  text-white p-1 rounded-md hover:bg-black/80 transition"
      >
        <ArrowLeft className="size-10" />
      </button>
      <button
        onClick={() => swiper.slideNext()}
        className=" bg-black/50  text-white p-1 rounded-md hover:bg-black/80 transition"
      >
        <ArrowRight className="size-10" />
      </button>
    </div>
  );
};

export default SwiperNavButton;
