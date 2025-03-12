import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useContentStore } from "../store/content";
import axios from "axios";
import NavBar from "../components/NavBar";
import ReactPlayer from "react-player";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperNavButton from "../components/SwiperNavButton";
import {
  ORIGINAL_IMG_BASE_URL,
  SMALL_IMG_BASE_URL,
} from "../contants/constants";
import WatchPageSkeleton from "../components/WatchPageSkeleton";

const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [similarContent, setSimilarContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);
  const { contentType } = useContentStore();

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
        setTrailers(res.data.trailers.slice(0, 5));
      } catch (error) {
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      }
    };
    getTrailers();
  }, [contentType, id]);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
        setSimilarContent(res.data.similar);
      } catch (error) {
        if (error.message.includes("404")) {
          setSimilarContent([]);
        }
      }
    };
    getSimilarContent();
  }, [contentType, id]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        setContent(res.data.content);
      } catch (error) {
        if (error.message.includes("404")) {
          setContent(null);
        }
      } finally {
        setLoading(false);
      }
    };
    getContentDetails();
  }, [contentType, id]);

  if (loading)
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );

  if (!content) {
    return (
      <div className="bg-black text-white h-screen">
        <div className="max-w-6xl mx-auto">
          <NavBar />
          <div className="text-center mx-auto px-4 py-8 h-full mt-40">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance">
              Content not found 😥
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
        <NavBar />

        <Swiper
          modules={[Navigation, Pagination]}
          loop
          className="overflow-hidden"
        >
          {trailers.map((trailer) => (
            <SwiperSlide
              key={trailer.id}
              className="aspect-video p-2 sm:px-10 md:px-32"
            >
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${trailer.key}`}
                width="100%"
                height="100%"
                controls
                className="mx-auto overflow-hidden rounded-lg"
              />
            </SwiperSlide>
          ))}
          <SwiperNavButton />
        </Swiper>

        {trailers?.length === 0 && (
          <h2 className="text-xl text-center mt-5">
            No trailers available for{" "}
            <span className="font-bold text-red-600">
              {content?.title || content?.name}
            </span>{" "}
            😥
          </h2>
        )}

        {/* movie details */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto mt-10">
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance">
              {content?.title || content?.name}
            </h2>
            <h3 className="text-2xl font-semibold my-2 text-red-600">
              {content?.original_title || content?.original_name}
            </h3>

            <p className="my-2 text-lg">
              {content?.release_date
                ? new Date(content.release_date).getFullYear()
                : new Date(content?.first_air_date).getFullYear()}{" "}
              |{" "}
              {content?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}{" "}
            </p>
            {content?.genres && (
              <p className="my-2 text-lg">
                Genres: {content.genres.map((genre) => genre.name).join(", ")}
              </p>
            )}
            {content?.production_countries && (
              <p className="my-2 text-lg">
                Contries:{" "}
                {content.production_countries
                  .map((country) => country.name)
                  .join(", ")}
              </p>
            )}
            <p className="mt-4 text-lg">{content?.overview}</p>
          </div>
          <img
            src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
            alt="Poster image"
            className="max-h-[600px] rounded-md"
          />
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          className="overflow-hidden mt-12 max-w-6xl mx-auto relative px-4"
          loop
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 20, slidesPerGroup: 2 },
            640: { slidesPerView: 3, spaceBetween: 30, slidesPerGroup: 3 },
            768: { slidesPerView: 4, spaceBetween: 40, slidesPerGroup: 4 },
            1024: { slidesPerView: 5, spaceBetween: 50, slidesPerGroup: 5 },
          }}
        >
          {similarContent.length > 0 && (
            <>
              <h3 className="text-3xl font-bold mb-4">
                Similar Movies/Tv Show
              </h3>
              {similarContent.map((content) => (
                <SwiperSlide
                  key={content.id}
                  className="flex flex-col items-center"
                >
                  <Link to={`/watch/${content.id}`} className="block w-full">
                    <img
                      src={SMALL_IMG_BASE_URL + content.poster_path}
                      alt="Poster path"
                      className="w-full h-72 md:h-80 lg:h-96 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                  <h4 className="mt-3 text-sm md:text-base font-semibold text-center text-white">
                    {content.title || content.name}
                  </h4>
                  <h4 className="text-center">
                    {content?.release_date
                      ? new Date(content?.release_date).getFullYear()
                      : new Date(content?.first_air_date).getFullYear()}
                  </h4>
                </SwiperSlide>
              ))}
            </>
          )}
          <SwiperNavButton />
        </Swiper>

        {/* {similarContent.length > 0 && (
          <div className="mt-12 max-w-5xl mx-auto relative">
            <h3 className="text-3xl font-bold mb-4">Similar Movies/Tv Show</h3>

            <div className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group">
              {similarContent.map((content) => {
                if (content.poster_path === null) return null;
                return (
                  <Link
                    key={content.id}
                    to={`/watch/${content.id}`}
                    className="w-52 flex-none"
                  >
                    <img
                      src={SMALL_IMG_BASE_URL + content.poster_path}
                      alt="Poster path"
                      className="w-full h-auto rounded-md"
                    />
                    <h4 className="mt-2 text-lg font-semibold">
                      {content.title || content.name}
                    </h4>
                  </Link>
                );
              })}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default WatchPage;
