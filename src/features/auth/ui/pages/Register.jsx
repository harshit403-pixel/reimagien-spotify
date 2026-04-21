import React from "react";
import { FaGoogle, FaApple } from "react-icons/fa";
import { FiSmartphone } from "react-icons/fi";
import { Logo } from "../../../../shared/utils/logo";
import { useAppNavigate } from "../../../../shared/hooks/useNavigate";

const Register = () => {


    let navigate = useAppNavigate()
    

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white font-spotify">
      
      <div className="w-full max-w-sm px-6 text-center">

        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-extrabold tracking-[-0.02em] leading-tighter mb-8">
          Sign up to <br /> start listening
        </h1>

        {/* Email */}
        <div className="text-left mb-4">
          <label className="text-sm font-semibold block mb-1">
            Email address
          </label>
          <input
            type="email"
            placeholder="name@domain.com"
            className="w-full bg-[#121212] border border-gray-600 rounded-md px-3 py-3 focus:outline-none focus:border-white"
          />
        </div>

        {/* Next Button */}
        <button className="w-full hover:scale-104 cursor-pointer bg-[#1ed760] text-black font-semibold py-3 rounded-full mb-6  transition">
          Next
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-[1px] bg-gray-700"></div>
          <span className="text-sm text-gray-400">or</span>
          <div className="flex-1 h-[1px] bg-gray-700"></div>
        </div>

        {/* Social Buttons */}
        <div className="flex flex-col gap-3">

          <button className="flex items-center hover:scale-104 cursor-pointer justify-center gap-3 border border-gray-600 py-3 rounded-full hover:border-white transition">
            <FiSmartphone />
            Sign up with phone number
          </button>

          <button className="flex items-center hover:scale-104 cursor-pointer justify-center gap-3 border border-gray-600 py-3 rounded-full hover:border-white transition">
            <FaGoogle />
            Sign up with Google
          </button>

          <button className="flex items-center hover:scale-104 cursor-pointer justify-center gap-3 border border-gray-600 py-3 rounded-full hover:border-white transition">
            <FaApple />
            Sign up with Apple
          </button>

        </div>

        {/* Login */}
        <p className="text-gray-400 mt-8 text-sm">
          Already have an account?
        </p>
        <p
        onClick={()=> navigate("/")}
        className="mt-2 font-semibold cursor-pointer hover:underline">
          Log in
        </p>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-8 leading-relaxed">
          This site is protected by reCAPTCHA and the Google{" "}
          <span className="underline">Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service</span> apply.
        </p>

      </div>
    </div>
  );
};

export default Register;