import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiInstance from "../../utils/axios";
import UserData from "../../components/plugin/UserData";
import Sidebar from "./Sidebar";
import Breadcrumb from "./Breadcrumb";
import { addToWishlist } from "../../components/plugin/addToWishlist";
// import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import ProductCard from "../../components/layouts/products/ProductCard";
import Loader from "../../components/layouts/Loader";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const axios = apiInstance;
  const userData = UserData();

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(
        `customer/wishlist/${userData?.user_id}/`
      );
      setWishlist(response.data);
      if (wishlist) {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [userData?.user_id]);

  console.log(wishlist);

  const handleAddToWishlist = async (product_id) => {
    try {
      await addToWishlist(product_id, userData?.user_id);
      fetchWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    {loading === false && (
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-1 lg:py-12">
              <Sidebar route="wishlist" />
            </div>
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-4 lg:p-12">
              <Breadcrumb title="Wishlist" />

              {/* Contents Here */}

              <div className="rounded-lg border border-gray-200">
                <div className="overflow-x-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-md:max-w-md mx-auto">
                    {wishlist.map((w, index) => (
                      <ProductCard data={w.product} key={index} />
                    ))}
                  </div>
                  {/* <table className="min-w-full bg-white font-[sans-serif]">
                    <thead className="bg-[#3e4095] whitespace-nowrap">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                          Product Image
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                          Product Title
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                          Brand
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="whitespace-nowrap divide-y divide-gray-200">
                      {wishlist.map((w, index) => (
                        <tr className="hover:bg-blue-50" key={index}>
                          <td className="px-6 py-4 text-sm">
                            <img src={w.product.image} className="w-100" />
                          </td>
                          <td className="px-6 py-4 text-sm">
                            {w.product.title.slice(0, 30)}...
                          </td>
                          <td className="px-6 py-4 text-sm">
                            {w.product?.brand?.title}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            ${w.product.price}
                          </td>
                          <td className="px-6 py-4 ">
                            <button
                              type="button"
                              onClick={() => handleAddToWishlist(w.product.id)}
                              className=""
                              title="View"
                            >
                              <FaHeart className="w-5 fill-red-500 hover:fill-red-700" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {wishlist.length < 1 && (
                        <h6 className="p-5">Your wishlist is Empty </h6>
                      )}
                    </tbody>
                  </table> */}
                </div>

                {/* <Pagination /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {loading === true && <Loader />}
    </>
  );
};

export default Wishlist;
