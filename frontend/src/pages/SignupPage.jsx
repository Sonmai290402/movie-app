import React from "react";
import { SignUp } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
// import toast from "react-hot-toast";

const SignupPage = () => {
  // const { searchParams } = new URL(document.location);
  // const emailValue = searchParams.get("email");
  // const [email, setEmail] = useState(emailValue || "");

  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/">
          <img src="/netflix-logo.png" alt="" className="w-52" />
        </Link>
      </header>
      <div className="flex justify-center items-center p-5">
        <SignUp />
      </div>
    </div>
  );
};

export default SignupPage;
