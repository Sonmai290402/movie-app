import React from "react";
import useGetTrending from "../hooks/useGetTrending";
import { Link } from "react-router-dom";
import { Info, Play } from "lucide-react";
import { ORIGINAL_IMG_BASE_URL } from "../contants/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperNavButton from "./SwiperNavButton";

const HeroSection = () => {
  const { trendingContent } = useGetTrending();
  if (!trendingContent || trendingContent.length === 0)
    return (
      <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
    );
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop
      className="relative w-full h-screen overflow-hidden"
    >
      {trendingContent.map((movie) => (
        <SwiperSlide key={movie.id}>
          <img
            src={ORIGINAL_IMG_BASE_URL + movie?.backdrop_path}
            alt={movie?.title || movie?.name}
            className="absolute top-0 left-0 w-full h-full object-cover -z-50"
          />
          <div
            className="absolute top-0 left-0 w-full h-full bg-black/30 -z-50"
            aria-hidden="true"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
            <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10" />
            <div className="max-w-2xl">
              <h1 className="mt-4 text-6xl font-extrabold text-balance">
                {movie?.title || movie?.name}
              </h1>
              <p className="mt-2 text-lg">
                {movie?.release_date
                  ? new Date(movie.release_date).getFullYear()
                  : new Date(movie?.first_air_date).getFullYear()}{" "}
                |{" "}
                {movie?.adult ? (
                  <span className="text-red-600">18+</span>
                ) : (
                  <span className="text-green-600">PG-13</span>
                )}
              </p>
              <p className="mt-4 text-lg line-clamp-4">{movie?.overview}</p>
            </div>

            <div className="flex mt-8">
              <Link
                to={`/watch/${movie?.id}`}
                className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center"
              >
                <Play className="size-6 mr-2 fill-black" />
                Play
              </Link>

              <Link
                to={`/details/${movie?.id}`}
                className="bg-gray-500/70 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-4 flex items-center"
              >
                <Info className="size-6 mr-2" />
                More Info
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <SwiperNavButton />
    </Swiper>
  );
};

export default HeroSection;
