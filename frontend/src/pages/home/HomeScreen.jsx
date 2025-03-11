import React from "react";
import NavBar from "../../components/NavBar";
import useGetTrending from "../../hooks/useGetTrending";
import { MOVIE_CATEGORIES, TV_CATEGORIES } from "../../contants/constants";
import { useContentStore } from "../../store/content";
import MovieSlider from "../../components/MovieSlider";
import HeroSection from "../../components/HeroSection";

const HomeScreen = () => {
  const { trendingContent } = useGetTrending();
  const { contentType } = useContentStore();
  if (!trendingContent)
    return (
      <div className="h-screen text-white relative bg-black">
        <NavBar />
        <HeroSection />
      </div>
    );
  return (
    <>
      <div className="relative h-screen text-white bg-black">
        <NavBar />
        <HeroSection />
      </div>
      <div className="flex flex-col gap-10 bg-black py-10 mt-10">
        {contentType === "movie"
          ? MOVIE_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))
          : TV_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))}
      </div>
    </>
  );
};

export default HomeScreen;
