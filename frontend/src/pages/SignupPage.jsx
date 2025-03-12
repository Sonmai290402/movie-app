import React from "react";
import { SignUp } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/">
          <img src="/netflix-logo.png" alt="" className="w-52" />
        </Link>
      </header>
      <div className="flex justify-center items-center">
        <SignUp />
      </div>
    </div>
  );
};

export default SignupPage;
