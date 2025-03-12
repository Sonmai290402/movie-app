import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/SearchPage";
import HistoryPage from "./pages/HistoryPage";
import NotFoundPage from "./pages/404";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";

function App() {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    );
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <SignedOut>
              <LoginPage />
            </SignedOut>
          }
        />
        <Route
          path="/signup"
          element={
            <SignedOut>
              <SignupPage />
            </SignedOut>
          }
        />
        <Route
          path="/watch/:id"
          element={
            <SignedIn>
              <WatchPage />
            </SignedIn>
          }
        />
        <Route
          path="/search"
          element={
            <SignedIn>
              <SearchPage />
            </SignedIn>
          }
        />
        <Route
          path="/history"
          element={
            <SignedIn>
              <HistoryPage />
            </SignedIn>
          }
        />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
