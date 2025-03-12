import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
      style={{ backgroundImage: `url('/404.png')` }}
    >
      <header className="absolute top-0 left-0 p-4 bg-black w-full ">
        <Link to={"/"}>
          <span className="text-5xl md:text-6xl font-bold text-red-600">
            LOGO
          </span>
        </Link>
      </header>
      <main className="flex items-center justify-center flex-col z-10 mx-2">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">Lost your way?</h1>
        <p className="mb-6 text-xl text-center">
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.
        </p>
        <Link
          to={"/"}
          className="flex gap-2 justify-center items-center w-fit bg-white text-black py-2 px-4 rounded hover:bg-red-600 hover:text-white"
        >
          <ArrowLeft className="size-5" />
          Netflix Home
        </Link>
      </main>
    </div>
  );
};
export default NotFoundPage;
