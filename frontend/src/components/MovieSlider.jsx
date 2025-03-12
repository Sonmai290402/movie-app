import React, { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../contants/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SwiperNavButton from "./SwiperNavButton";

const MovieSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);

  const formattedCategoryName =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);
  const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

  useEffect(() => {
    const getContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${category}`);
        setContent(res.data.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getContent();
  }, [category, contentType]);

  return (
    <div className="bg-black text-white relative px-5 md:px-20 py-6">
      <h2 className="mb-6 text-2xl font-bold">
        {formattedCategoryName} {formattedContentType}
      </h2>
      <Swiper
        modules={[Navigation]}
        slidesPerView={2}
        spaceBetween={10}
        breakpoints={{
          480: { slidesPerView: 2, spaceBetween: 20, slidesPerGroup: 2 },
          640: { slidesPerView: 3, spaceBetween: 30, slidesPerGroup: 3 },
          768: { slidesPerView: 4, spaceBetween: 40, slidesPerGroup: 4 },
          1024: { slidesPerView: 5, spaceBetween: 50, slidesPerGroup: 5 },
        }}
        loop
        className="overflow-hidden"
      >
        {content.map((item, index) => (
          <SwiperSlide key={item.id}>
            <Link
              to={`/watch/${item.id}`}
              className="block group cursor-pointer"
            >
              <div className="rounded-lg overflow-hidden">
                {formattedCategoryName === "Popular" ? (
                  <>
                    <img
                      src={SMALL_IMG_BASE_URL + item.poster_path}
                      alt={item.title || item.name}
                      className="w-full h-[300px] object-cover object-top transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                    <span className="absolute z-50 bottom-2 left-6 -translate-y-2/3 -translate-x-1/2 bg-opacity-70 [text-shadow:_-1px_-1px_0px_white,1px_-1px_0px_white,-1px_1px_0px_white,1px_1px_0px_white] text-black text-7xl font-extrabold px-2 py-1">
                      {index + 1}
                    </span>
                  </>
                ) : (
                  <img
                    src={SMALL_IMG_BASE_URL + item.backdrop_path}
                    alt={item.title || item.name}
                    className="w-full transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                )}
              </div>

              <p className="mt-2 min-h-10 text-center text-sm md:text-base">
                {item.title || item.name}
              </p>
            </Link>
          </SwiperSlide>
        ))}
        <SwiperNavButton />
      </Swiper>
    </div>
  );
};

export default MovieSlider;
