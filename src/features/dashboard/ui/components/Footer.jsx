import React from "react";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div className=" mt-20 text-gray-400 px-10 py-12 border-t border-[#282828]">

      {/* Top Section */}
      <div className="flex flex-wrap justify-between gap-10 mb-10">

        {/* Columns */}
        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Jobs</li>
            <li className="hover:text-white cursor-pointer">For the Record</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Communities</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">For Artists</li>
            <li className="hover:text-white cursor-pointer">Developers</li>
            <li className="hover:text-white cursor-pointer">Advertising</li>
            <li className="hover:text-white cursor-pointer">Investors</li>
            <li className="hover:text-white cursor-pointer">Vendors</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Useful links</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Support</li>
            <li className="hover:text-white cursor-pointer">Free Mobile App</li>
            <li className="hover:text-white cursor-pointer">Popular by Country</li>
            <li className="hover:text-white cursor-pointer">Import your music</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Spotify Plans</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Premium Lite</li>
            <li className="hover:text-white cursor-pointer">Premium Standard</li>
            <li className="hover:text-white cursor-pointer">Premium Platinum</li>
            <li className="hover:text-white cursor-pointer">Premium Student</li>
            <li className="hover:text-white cursor-pointer">Spotify Free</li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#181818] hover:bg-[#282828] cursor-pointer">
            <FaInstagram />
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#181818] hover:bg-[#282828] cursor-pointer">
            <FaTwitter />
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#181818] hover:bg-[#282828] cursor-pointer">
            <FaFacebookF />
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-[#282828] pt-6 flex flex-wrap justify-between items-center text-sm">

        {/* Left */}
        <div className="flex flex-wrap gap-4">
          <span className="hover:text-white cursor-pointer">Legal</span>
          <span className="hover:text-white cursor-pointer">Safety & Privacy Center</span>
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Cookies</span>
          <span className="hover:text-white cursor-pointer">About Ads</span>
          <span className="hover:text-white cursor-pointer">Accessibility</span>
        </div>

        {/* Right */}
        <div className="mt-4 md:mt-0 text-gray-500">
          © 2026 Spotify AB
        </div>

      </div>
    </div>
  );
};

export default Footer;