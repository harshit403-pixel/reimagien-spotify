import React from "react";
import Footer from "../components/Footer";

const NotificationPage = () => {
  return (
    <div className=" text-white min-h-screen py-10 px-10 ">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">What’s New</h1>
        <p className="text-gray-400 text-sm mb-4">
          The latest releases from artists, podcasts and shows you follow.
        </p>

        {/* Filters */}
        <div className="flex gap-3">
          <button className="bg-[#2a2a2a] px-4 py-1 rounded-full text-sm hover:bg-[#3a3a3a]">
            Music
          </button>
          <button className="bg-[#2a2a2a] px-4 py-1 rounded-full text-sm hover:bg-[#3a3a3a]">
            Podcast & Shows
          </button>
        </div>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center mb-50 text-center mt-20">
        <h2 className="text-3xl font-bold mb-4">
          We don’t have any updates for you yet
        </h2>

        <p className="text-gray-400 max-w-xl">
          When there’s news, we’ll post it here. Follow your favourite artists
          and podcasts to stay updated on them too.
        </p>
      </div>
<Footer/>
    </div>
  );
};

export default NotificationPage;