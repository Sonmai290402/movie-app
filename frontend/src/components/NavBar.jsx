import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu } from "lucide-react";
import { useContentStore } from "../store/content";
import { UserButton } from "@clerk/clerk-react";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const { setContentType } = useContentStore();

  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20 ">
      <div className="flex items-center gap-10 z-50">
        <Link to="/">
          <img
            src="/netflix-logo.png"
            alt="Netflix logo"
            className="w-32 sm:w-40"
          />
        </Link>

        {/* Desktop NavBar */}
        <div className="hidden sm:flex gap-5 items-center">
          <Link
            to={"/"}
            className="hover:underline"
            onClick={() => setContentType("movie")}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="hover:underline"
            onClick={() => setContentType("tv")}
          >
            TV Shows
          </Link>
          <Link to={"/history"} className="hover:underline">
            Search History
          </Link>
        </div>
      </div>

      <div className="flex gap-5 items-center z-50">
        <Link to={"/search"}>
          <Search className="size-6 cursor-pointer" />
        </Link>
        <UserButton />
        {/* <SignOutButton /> */}
        <div className="sm:hidden">
          <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu} />
        </div>
      </div>

      {/* Mobile NavBar */}
      {isMobileMenuOpen && (
        <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
          <Link
            to={"/"}
            className="block hover:bg-gray-900 p-2"
            onClick={() => {
              setContentType("movie");
              toggleMobileMenu();
            }}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="block hover:bg-gray-900 p-2"
            onClick={() => {
              toggleMobileMenu();
              setContentType("tv");
            }}
          >
            Tv Shows
          </Link>
          <Link
            to={"/history"}
            className="block hover:bg-gray-900 p-2"
            onClick={toggleMobileMenu}
          >
            Search History
          </Link>
        </div>
      )}
    </header>
  );
};

export default NavBar;
