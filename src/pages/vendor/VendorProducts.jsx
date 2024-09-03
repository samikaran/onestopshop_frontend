import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Breadcrumb from "./Breadcrumb";

import apiInstance from "../../utils/axios";
import UserData from "../../components/plugin/UserData";
import { deleteProduct } from "../../components/plugin/DeleteProduct";

const VendorProducts = () => {
  const [products, setProducts] = useState([]);

  const axios = apiInstance;
  const userData = UserData();

  if (UserData()?.vendor_id === 0) {
    window.location.href = "/vendor/register/";
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `vendor/products/${userData?.vendor_id}/`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteProduct = async (productPid) => {
    try {
      await deleteProduct(userData?.vendor_id, productPid);
      await fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterProduct = async (param) => {
    try {
      const response = await axios.get(
        `vendor-product-filter/${userData?.vendor_id}?filter=${param}`
      );
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-1 lg:py-12">
              <Sidebar route="products" />
            </div>
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-4 lg:p-12">
              <Breadcrumb title="Products" />

              {/* Contents Here */}
              <div className="overflow-x-auto mt-5">
                <table className="min-w-full bg-white font-[sans-serif]">
                  <thead className="bg-[#3e4095] whitespace-nowrap">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                        #ID
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                        Orders
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="whitespace-nowrap divide-y divide-gray-200">
                    {products?.map((p, index) => (
                      <tr className="hover:bg-blue-50" key={index}>
                        <td className="px-6 py-4 text-sm">{p.sku}</td>
                        <td className="px-6 py-4 text-sm" title={p.title}>
                          {p.title.length > 40
                            ? p.title.slice(0, 40) + "..."
                            : p.title}
                        </td>
                        <td className="px-6 py-4 text-sm">${p.price}</td>
                        <td className="px-6 py-4 text-sm">{p.stock_qty}</td>
                        <td className="px-6 py-4 text-sm">{p.order_count}</td>
                        <td className="px-6 py-4 text-sm">
                          {p?.status?.toUpperCase()}
                        </td>
                        <td className="px-6 py-4 flex">
                          <Link
                            to={`/product/${p.slug}/${p.id}`}
                            className="mr-2"
                            title="View"
                          >
                            <FaEye className="w-5 fill-blue-500 hover:fill-blue-700" />
                          </Link>
                          <Link
                            to={`/vendor/product/update/${p.pid}/`}
                            className="mr-2"
                            title="Edit"
                          >
                            <FiEdit className="w-5 text-green-500 hover:text-green-700" />
                          </Link>
                          <button
                            title="Delete"
                            onClick={() => handleDeleteProduct(p.pid)}
                          >
                            <RiDeleteBin6Line className="w-5 fill-red-500 hover:fill-red-700" />
                          </button>
                        </td>
                      </tr>
                    ))}

                    {products < 1 && (
                      <h5 className="mt-4 p-3">No products yet</h5>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VendorProducts;
