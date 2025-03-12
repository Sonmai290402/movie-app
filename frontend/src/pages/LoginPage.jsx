import { SignIn } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/">
          <img src="/netflix-logo.png" alt="" className="w-52" />
        </Link>
      </header>
      <div className="flex items-center justify-center p-10">
        <SignIn />
      </div>
    </div>
  );
};

export default LoginPage;
