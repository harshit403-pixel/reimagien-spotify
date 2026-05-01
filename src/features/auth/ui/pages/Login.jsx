import React, { useState } from "react";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import { FiSmartphone } from "react-icons/fi";
import { Logo } from "../../../../shared/utils/logo";
import { useAppNavigate } from "../../../../shared/hooks/useNavigate";
import { loginUser } from "../../utils/authStorage.js";


const Login = () => {
    let navigate = useAppNavigate()
    const [email, setEmail] = useState("")

    const handleLogin = () => {
      const result = loginUser(email)

      if (!result.success) {
        window.alert(result.message)

        if (result.code === "NO_USERS" || result.code === "NOT_FOUND") {
          navigate("/register")
        }

        return
      }

      navigate("/dashboard")
    }

    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleLogin()
      }
    }

  return (
    <div className="min-h-screen   bg-[#121212] flex items-center justify-center text-white">
        
      
      <div className="w-full max-w-sm flex flex-col  px-8 py-10 text-center">
        
        {/* Logo Placeholder */}
        <div className=" mx-auto mb-6">
          < Logo/>
        </div>

        {/* Heading */}
        <h1 className="text-5xl tracking-tighter font-spotify font-bold  mb-6">Welcome back</h1>

        {/* Email Input */}
        <div className="text-left mb-4">
          <label className="text-sm font-medium block mb-1">Email</label>
          <input
            type="email"
            placeholder=""
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-[#121212] border border-gray-600 rounded-md px-3 py-3 focus:outline-none focus:border-white"
          />
        </div>

        {/* Continue Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-[#1ed760] cursor-pointer text-black font-spotify font-bold py-3 hover:bg-[#3be477] rounded-full hover:scale-[1.02] transition mb-5"
        >
          Continue
        </button>

        {/* OR Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-[1px] bg-gray-700"></div>
          <span className="text-sm text-gray-400">or</span>
          <div className="flex-1 h-[1px] bg-gray-700"></div>
        </div>

        {/* Social Buttons */}
        <div className="flex flex-col gap-3">

          <button className="flex items-center justify-center gap-3 border border-gray-600 py-3 rounded-full hover:scale-104 cursor-pointer hover:border-white transition">
            <FiSmartphone />
            Continue with phone number
          </button>

          <button className="flex items-center justify-center gap-3 border border-gray-600 py-3 rounded-full hover:scale-104 cursor-pointer hover:border-white transition">
            <FaGoogle />
            Continue with Google
          </button>

          <button className="flex items-center justify-center gap-3 border border-gray-600 py-3 rounded-full hover:scale-104 cursor-pointer hover:border-white transition">
            <FaFacebookF />
            Continue with Facebook
          </button>

          <button className="flex items-center justify-center gap-3 border border-gray-600 py-3 rounded-full hover:scale-104 cursor-pointer hover:border-white transition">
            <FaApple />
            Continue with Apple
          </button>

        </div>

        {/* Signup */}
        <p className="text-gray-400 mt-8 text-sm">
          Don’t have an account?
        </p>
        <p
        onClick={()=> navigate("/register")}
        className="mt-2 font-semibold cursor-pointer hover:underline">
          Sign up
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

export default Login;
