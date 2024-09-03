import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { CgProfile, CgTrack } from "react-icons/cg";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { CiHeart, CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";

import UserProfileData from "../../components/plugin/UserProfileData";

const Sidebar = ({ route }) => {
  const userProfile = UserProfileData();
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userProfile) {
      setLoading(false);
    }
  });

  return (
    <>
      <nav className="bg-white shadow-lg h-screen  min-w-[250px] py-6 px-4 font-[sans-serif] overflow-auto">
        <Link to={"/customer/account/"} className=" ">
          <img src={userProfile?.image} alt="logo" className="w-[120px]" />
        </Link>
        <h6 className="text-[#3e4095] text-sm font-bold px-4 mt-4">
          {userProfile?.full_name}
        </h6>
        <hr className="mt-6" />
        <div className="mt-6">
          <ul className="mt-3">
            <li>
              <Link
                to={"/customer/account"}
                className={`${
                  route === "account"
                    ? "bg-[#74bf44] hover:bg-[#3e4095] text-white"
                    : "text-gray-700 hover:bg-[#74bf44] hover:text-white"
                } text-sm flex items-center  rounded px-4 py-3 transition-all`}
              >
                <CgProfile className="w-[18px] h-[18px] mr-4" />
                <span>Account</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/customer/orders/"}
                className={`${
                  route === "orders"
                    ? "bg-[#74bf44] hover:bg-[#3e4095] text-white"
                    : "text-gray-700 hover:bg-[#74bf44] hover:text-white"
                } text-sm flex items-center  rounded px-4 py-3 transition-all`}
              >
                <HiMiniShoppingBag className="w-[18px] h-[18px] mr-4" />
                <span>Orders</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/customer/wishlist/"}
                className={`${
                  route === "wishlist"
                    ? "bg-[#74bf44] hover:bg-[#3e4095] text-white"
                    : "text-gray-700 hover:bg-[#74bf44] hover:text-white"
                } text-sm flex items-center  rounded px-4 py-3 transition-all`}
              >
                <CiHeart className="w-[18px] h-[18px] mr-4" />
                <span>Wishlist</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/customer/notifications/"}
                className={`${
                  route === "notifications"
                    ? "bg-[#74bf44] hover:bg-[#3e4095] text-white"
                    : "text-gray-700 hover:bg-[#74bf44] hover:text-white"
                } text-sm flex items-center  rounded px-4 py-3 transition-all`}
              >
                <IoIosNotificationsOutline className="w-[18px] h-[18px] mr-4" />
                <span>Notifications</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/customer/settings/"}
                className={`${
                  route === "settings"
                    ? "bg-[#74bf44] hover:bg-[#3e4095] text-white"
                    : "text-gray-700 hover:bg-[#74bf44] hover:text-white"
                } text-sm flex items-center  rounded px-4 py-3 transition-all`}
              >
                <CiSettings className="w-[18px] h-[18px] mr-4" />
                <span>Settings</span>
              </Link>
            </li>
            {/* <li>
              <Link
                to={"/customer/track-order/"}
                className={`${
                  route === "track-order"
                    ? "bg-[#74bf44] hover:bg-[#3e4095] text-white"
                    : "text-gray-700 hover:bg-[#74bf44] hover:text-white"
                } text-sm flex items-center  rounded px-4 py-3 transition-all`}
              >
                <CgTrack className="w-[18px] h-[18px] mr-4" />
                <span>Track Orders</span>
              </Link>
            </li> */}
          </ul>
        </div>
        <div className="mt-6">
          <hr className="text-blue-600 text-sm font-bold px-4"></hr>
          <ul className="mt-3">
            <li>
              <Link
                to={"/logout/"}
                className={`${
                  route === "logout"
                    ? "bg-[#74bf44] hover:bg-[#3e4095] text-white"
                    : "text-gray-700 hover:bg-[#ff000093] hover:text-white"
                } text-sm flex items-center  rounded px-4 py-3 transition-all`}
              >
                <AiOutlineLogout className="w-[18px] h-[18px] mr-4" />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
