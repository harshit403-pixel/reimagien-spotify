import React from "react";
import { Logo } from "../../../../shared/utils/logo";
import Footer from "../components/Footer";
const plans = [
  {
    logo: <Logo/>,
    name: "Lite",
    price: "₹119/month",
    features: [
      "1 Lite account",
      "High audio quality (up to 160kbps)",
      "Cancel anytime",
    ],
    color: "bg-[#c7e0fc] text-black",
    textColor: "text-[#c7e0fc]"
  },
  {
    logo: <Logo/>,
    name: "Standard",
    price: "₹119/month",
    features: [
      "1 Standard account",
      "Download to listen offline",
      "High audio quality",
      "Cancel anytime",
    ],
    color: "bg-[#1ed760] text-black",
    textColor: "text-[#1ed760]"
  },
  {
    logo: <Logo/>,
    name: "Platinum",
    price: "₹179/month",
    features: [
      "Up to 6 Premium accounts",
      "Download offline",
      "Very high quality",
      "Cancel anytime",
    ],
    color: "bg-yellow-400 text-black",
     textColor: "text-[#f3ff46]"
  },
  {
    logo: <Logo/>,
    name: "Student",
    price: "₹59/month",
    features: [
      "Verified student discount",
      "Download offline",
      "High quality",
      "Cancel anytime",
    ],
    color: "bg-green-400 text-black",
    textColor: "text-[#96f0b6]"
  },
];

const PremiumPage = () => {
  return (
    <div className=" text-white min-h-screen">

      {/* Top Banner */}
      <div className="bg-gradient-to-b h-80 flex flex-col justify-center  from-purple-700 to-black p-8 rounded-lg text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">
          Get more out of your music with Premium
        </h1>
        <p className="text-md text-gray-300 mb-4">
          Enjoy uninterrupted listening with Spotify Premium.
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-white text-black px-5 py-2 rounded-full font-semibold">
            Get Premium
          </button>
          <button className="border border-white px-5 py-2 rounded-full">
            View all plans
          </button>
        </div>
      </div>

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-xl font-bold">
          Choose the Premium plan that's right for you
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          Cancel anytime. Pay monthly.
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 px-20 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-[#181818] p-5 rounded-lg hover:bg-[#232323] transition"
          >
            <div className="flex items-center gap-2 font-spotify font-bold text-xl pb-2">
                {plan.logo} <h1>Premium</h1>
            </div>
            <h3 className={`text-3xl font-bold mb-1  ${plan.textColor} `}>{plan.name}</h3>
            <p className="text-sm text-gray-400 mb-4">{plan.price}</p>

            <div className="h-[1px] w-full rounded bg-white/10 mb-5 " ></div>

            <ul className="text-sm text-gray-300 space-y-2 mb-5">
              {plan.features.map((f, i) => (
                <li key={i}>• {f}</li>
              ))}
            </ul>

            <button
              className={`w-full py-2 rounded-full font-semibold ${plan.color}`}
            >
              Get {plan.name}
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Comparison */}
      <div className="mt-16 text-center">
        <h2 className="text-xl font-bold mb-6">Experience the difference</h2>

        <div className="max-w-3xl mx-auto border border-gray-700 rounded-lg overflow-hidden">
          <div className="grid grid-cols-3 text-sm">
            <div className="p-3 bg-[#121212] text-left">Features</div>
            <div className="p-3 bg-[#121212]">Free</div>
            <div className="p-3 bg-[#121212]">Premium</div>

            {[
              "Ad-free music",
              "Play anywhere",
              "High quality audio",
              "Offline listening",
            ].map((item, i) => (
              <React.Fragment key={i}>
                <div className="p-3 border-t border-gray-700 text-left">
                  {item}
                </div>
                <div className="p-3 border-t border-gray-700">—</div>
                <div className="p-3 border-t border-gray-700">✔</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <Footer/>

    </div>
  );
};

export default PremiumPage;
