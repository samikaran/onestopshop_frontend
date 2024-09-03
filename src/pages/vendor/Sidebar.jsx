import { React, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { CgProfile, CgTrack } from "react-icons/cg";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { CiHeart, CiSettings, CiBadgeDollar } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import {
  MdOutlineRateReview,
  MdOutlineAddShoppingCart,
  MdOutlineDiscount,
} from "react-icons/md";

import UserProfileData from "../../components/plugin/UserProfileData";

const Sidebar = ({ route }) => {
  const userProfile = UserProfileData();
  let [loading, setLoading] = useState(true);

  const location = useLocation();
  const isActiveLink = (currentPath, linkPath) => {
    return currentPath.includes(linkPath);
  };

  useEffect(() => {
    if (userProfile) {
      setLoading(false);
    }
  });

  return (
    <>
      <nav className="bg-white shadow-lg h-screen  min-w-[250px] py-6 px-4 font-[sans-serif] overflow-auto">
        <Link to={"/vendor/dashboard/"} className=" ">
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
                to={"/vendor/dashboard/"}
                className={`${
                  isActiveLink(location.pathname, "/vendor/dashboard/")
                    ? "bg-[#74bf44] hover:bg-[#3e4095] text-white"
                    : "text-gray-700 hover:bg-[#74bf44] hover:text-white"
                } text-sm flex items-center  rounded px-4 py-3 transition-all`}
              >
                <CgProfile className="w-[18px] h-[18px] mr-4" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/vendor/products/"}
                className={`${
                  isActiveLink(location.pathname, "/vendor/products/")
                    ? "bg-[#74bf44] hover:bg-[#3e4095] text-white"
                    : "text-gray-700 hover:bg-[#74bf44] hover:text-white"
                } text-sm flex items-center  rounded px-4 py-3 transition-all`}
              >
                <FiShoppingCart className="w-[18px] h-[18px] mr-4" />
                <span>Products</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/vendor/product/new/"}
                className={`${
                  route === "addproduct"
                    ? "bg-[#74bf44] hover:bg-[#3e4095] text-white"
                    : "text-gray-700 hover:bg-[#74bf44] hover:text-white"
                } text-sm flex items-center  rounded px-4 py-3 transition-all`}
              >
                <MdOutlineAddShoppingCart className="w-[18px] h-[18px] mr-4" />
                <span>Add Product</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/vendor/orders/"}
                className={`${
                  isActiveLink(location.pathname, "/vendor/orders/")
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
                to={"/vendor/earning/"}
                className={`${
                  isActiveLink(location.pathname, "/vendor/earning/")
                    ? "bg-[#74bf44] hover:bg-[#3e4095] text-white"
                    : "text-gray-700 hover:bg-[#74bf44] hover:text-white"
                } text-sm flex items-center  rounded px-4 py-3 transition-all`}
              >
                <CiBadgeDollar className="w-[18px] h-[18px] mr-4" />
                <span>Earnings</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/vendor/reviews/"}
                className={`${
                  route === "reviews"
                    ? "bg-[#74bf44] hover:bg-[#3e4095] text-white"
                    : "text-gray-700 hover:bg-[#74bf44] hover:text-white"
                } text-sm flex items-center  rounded px-4 py-3 transition-all`}
              >
                <MdOutlineRateReview className="w-[18px] h-[18px] mr-4" />
                <span>Reviews</span>
              </Link>
            </li>

            <li>
              <Link
                to={"/vendor/coupon/"}
                className={`${
                  route === "coupon"
                    ? "bg-[#74bf44] hover:bg-[#3e4095] text-white"
                    : "text-gray-700 hover:bg-[#74bf44] hover:text-white"
                } text-sm flex items-center  rounded px-4 py-3 transition-all`}
              >
                <MdOutlineDiscount className="w-[18px] h-[18px] mr-4" />
                <span>Coupon &amp; Discount</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/vendor/notifications/"}
                className={`${
                  isActiveLink(location.pathname, "/vendor/notifications/")
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
                to={"/vendor/settings/"}
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
