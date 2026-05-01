import React, { useEffect, useRef, useState } from "react";
import { FaHome } from "react-icons/fa";
import { FiChevronDown, FiDownload, FiLogOut, FiSearch } from "react-icons/fi";
import { HiOutlineBell } from "react-icons/hi";
import { HiOutlineQueueList } from "react-icons/hi2";
import { BsPeople } from "react-icons/bs";
import { useLocation, useSearchParams } from "react-router";
import { useDispatch } from "react-redux";
import { Logo } from "../../../../shared/utils/logo";
import { useAppNavigate } from "../../../../shared/hooks/useNavigate";
import {
  getLoggedInUser,
  getUserDisplayName,
  getUserInitial,
  logoutUser,
} from "../../../auth/utils/authStorage.js";
import { resetPlayer } from "../../../player/state/playerSlice.jsx";
import Friends from "../pages/Friends";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useAppNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const loggedInUser = getLoggedInUser();
  const searchValue = searchParams.get("search") ?? "";
  const userDisplayName = getUserDisplayName(loggedInUser);

  useEffect(() => {
    if (!isProfileMenuOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!profileMenuRef.current?.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isProfileMenuOpen]);

  const handleSearchChange = (event) => {
    const nextSearchValue = event.target.value;
    const nextSearchParams = new URLSearchParams(searchParams);

    if (nextSearchValue.trim()) {
      nextSearchParams.set("search", nextSearchValue);
    } else {
      nextSearchParams.delete("search");
    }

    const nextSearch = nextSearchParams.toString();
    const nextDashboardPath = `/dashboard${nextSearch ? `?${nextSearch}` : ""}`;

    if (
      location.pathname !== "/dashboard" &&
      location.pathname !== "/dashboard/liked-songs"
    ) {
      navigate(nextDashboardPath);
      return;
    }

    setSearchParams(nextSearchParams, { replace: true });
  };

  const handleLogout = () => {
    setIsProfileMenuOpen(false);
    dispatch(resetPlayer());
    logoutUser();
    navigate("/", { replace: true });
  };

  return (
    <div className="w-full  h-[9%] bg-black px-6 py-3 flex items-center justify-between text-white">
      <div className="flex w-[30%] items-center">
        <div
          onClick={() => navigate("/dashboard")}
          className="cursor-pointer "
        >
          <Logo />
        </div>
      </div>

      <div className="flex  items-center gap-2">
        <div
          onClick={() => navigate("/dashboard")}
          className="bg-[#1f1f1f] p-2 rounded-full cursor-pointer hover:bg-[#2a2a2a]"
        >
          <FaHome
            size={28}
            className="transition-all ease-in-out duration-500 hover:scale-[1.1] p-[.2]"
          />
        </div>

        <div className="flex items-center w-[500px] mr-20 bg-[#1f1f1f] rounded-full group duration-500 hover:shadow-[0px_0px_0px_1px_white] transition-all ease-in-out px-4 py-2 w-[400px] hover:bg-[#3f3f3f]">
          <FiSearch size={28} className="text-gray-400 mr-3" />
          <div className="flex justify-between w-full">
            <input
              type="text"
              placeholder="What do you want to play?"
              value={searchValue}
              onChange={handleSearchChange}
              className="bg-transparent  outline-none w-full text-sm  placeholder-gray-400 duration-500 group-hover:placeholder-gray-100 "
            />
            <div className="flex gap-3">
              <div className="border-l h-full border-white/60 "></div>
              <HiOutlineQueueList
                size={28}
                className=" text-gray-300 hover:white transition-all ease-in-out duration-500 hover:scale-[1.1]  cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/dashboard/premium")}
          className="bg-white cursor-pointer text-black px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition"
        >
          Explore Premium
        </button>

        <div
          onClick={() => navigate("/dashboard/download")}
          className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer"
        >
          <FiDownload />
          <span className="text-sm">Install App</span>
        </div>

        <HiOutlineBell
          onClick={() => navigate("/dashboard/notifications")}
          className="text-xl cursor-pointer hover:text-white text-gray-300"
        />
        <BsPeople
          onClick={() => <Friends />}
          className="text-xl cursor-pointer hover:text-white text-gray-300"
        />

        <div ref={profileMenuRef} className="relative">
          <button
            type="button"
            title={loggedInUser?.email ?? "Profile"}
            onClick={() => setIsProfileMenuOpen((currentValue) => !currentValue)}
            className="flex items-center gap-2 rounded-full border border-transparent px-2 py-1 transition hover:border-white/10 hover:bg-[#1f1f1f] cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center">
              <span className="text-sm font-bold">
                {getUserInitial(loggedInUser)}
              </span>
            </div>

            <FiChevronDown
              className={`text-sm text-gray-400 transition-transform ${
                isProfileMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isProfileMenuOpen ? (
            <div className="absolute right-0 top-full z-20 mt-3 w-64 rounded-2xl border border-white/10 bg-[#181818] p-4 shadow-2xl">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                Signed in as
              </p>
              <p className="mt-2 text-sm font-semibold text-white">
                {userDisplayName}
              </p>
              <p className="break-all text-sm text-gray-400">
                {loggedInUser?.email ?? "Guest"}
              </p>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:scale-[1.01] cursor-pointer"
              >
                <FiLogOut />
                Log out
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
