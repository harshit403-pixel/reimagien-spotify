import React from "react";
import { FaHome } from "react-icons/fa";
import { FiSearch, FiDownload } from "react-icons/fi";
import { HiOutlineBell } from "react-icons/hi";
import { HiOutlineQueueList } from "react-icons/hi2";
import { BsPeople } from "react-icons/bs";
import { Logo } from "../../../../shared/utils/logo"; // adjust path
import { useAppNavigate } from "../../../../shared/hooks/useNavigate";
import Friends from "../pages/Friends";

const Navbar = () => {
    let navigate = useAppNavigate()
  return (
    <div className="w-full  h-[9%] bg-black px-6 py-3 flex items-center justify-between text-white">
      
      {/* LEFT */}
      <div className="flex w-[30%] items-center">
       
            <div
            onClick={()=> navigate("/dashboard")}
            className="cursor-pointer ">
                <Logo  />
            </div>
            </div>
        

   <div className="flex  items-center gap-2" >
         <div
         onClick={()=> navigate("/dashboard")}
         className="bg-[#1f1f1f] p-2 rounded-full cursor-pointer hover:bg-[#2a2a2a]">
          <FaHome size={28} className="transition-all ease-in-out duration-500 hover:scale-[1.1] p-[.2]" />
        </div>

        {/* Search */}
        <div className="flex items-center w-[500px] mr-20 bg-[#1f1f1f] rounded-full group duration-500    hover:shadow-[0px_0px_0px_1px_white] transition-all ease-in-out  px-4 py-2 w-[400px] hover:bg-[#3f3f3f]">
          <FiSearch size={28}  className="text-gray-400 mr-3" />
          <div className="flex justify-between w-full">
            <input
            type="text"
            placeholder="What do you want to play?"
            className="bg-transparent  outline-none w-full text-sm  placeholder-gray-400 duration-500 group-hover:placeholder-gray-100 "

          />
          <div className="flex gap-3">
          <div className="border-l h-full border-white/60 " ></div>
          <HiOutlineQueueList size={28} className=" text-gray-300 hover:white transition-all ease-in-out duration-500 hover:scale-[1.1]  cursor-pointer"   />
          </div></div>
        </div>
   </div>
      

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        <button
        onClick={()=> navigate("/dashboard/premium")}
        className="bg-white cursor-pointer text-black px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition">
          Explore Premium
        </button>

        <div
        onClick={()=> navigate("/dashboard/download")}
        className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer">
          <FiDownload />
          <span className="text-sm">Install App</span>
        </div>

        <HiOutlineBell
         onClick={()=> navigate("/dashboard/notifications")}
        className="text-xl cursor-pointer hover:text-white text-gray-300" />
        <BsPeople
        onClick={()=> <Friends  /> }
        className="text-xl cursor-pointer hover:text-white text-gray-300" />

        {/* Profile */}
        <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer">
          <span className="text-sm font-bold">A</span>
        </div>

      </div>
    </div>
  );
};

export default Navbar;