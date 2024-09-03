import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { FaEye } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Breadcrumb from "./Breadcrumb";

import apiInstance from "../../utils/axios";
import UserData from "../../components/plugin/UserData";
import Loader from "../../components/layouts/Loader";

const VendorOrders = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("Filter");
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);

  const axios = apiInstance;
  const userData = UserData();

  if (UserData()?.vendor_id === 0) {
    window.location.href = "/vendor/register/";
  }

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `vendor/orders/${userData?.vendor_id}/`
        );
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleselect = (option) => {
    // console.log(option);
    if (option === "paid") {
      setFilter("Payment Status: Paid");
    }
    if (option === "pending") {
      setFilter("Payment Status: Pending");
    }
    if (option === "processing") {
      setFilter("Payment Status: Processing");
    }
    if (option === "cancelled") {
      setFilter("Payment Status: Cancelled");
    }
    if (option === "latest") {
      setFilter("Date: Latest");
    }
    if (option === "oldest") {
      setFilter("Date: Oldest");
    }
    if (option === "Pending") {
      setFilter("Delivery Status: Pending");
    }
    if (option === "Processing") {
      setFilter("Delivery Status: Processing");
    }
    if (option === "Arrived") {
      setFilter("Delivery Status: Arrived");
    }
    if (option === "Delivered") {
      setFilter("Delivery Status: Delivered");
    }
    if (option === " ") {
      setFilter("Filter");
    }
  };

  const handleFilterOrders = async (filter) => {
    handleselect(filter);
    // setFilter(option);
    // onChange(option.value);
    setLoading(true);
    setIsOpen(false);

    const response = await axios.get(
      `vendor/orders/filter/${userData?.vendor_id}?filter=${filter}`
    );
    setOrders(response.data);
    setLoading(false);
  };

  return (
    <>
      {loading === false && (
        <section className="bg-gray-100">
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
              <div className="lg:col-span-1 lg:py-12">
                <Sidebar route="orders" />
              </div>
              <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-4 lg:p-12">
                <Breadcrumb title="Orders" />

                {/* Contents Here */}
                <div className="overflow-x-auto mt-5">
                  <div className="relative font-[sans-serif] w-max mt-5 mb-5">
                    <button
                      type="button"
                      className="px-6 py-2.5 rounded text-white text-sm font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
                      onClick={toggleDropdown}
                    >
                      {filter}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 fill-white inline ml-3"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                          clip-rule="evenodd"
                          data-original="#000000"
                        />
                      </svg>
                    </button>
                    {isOpen && (
                      <ul class="absolute shadow-lg bg-white py-2 z-[1000] min-w-full w-max rounded max-h-96 overflow-auto">
                        <li class="py-2.5 px-6 hover:bg-blue-50 text-black text-sm cursor-pointer">
                          <button onClick={() => handleFilterOrders(" ")}>
                            Filter
                          </button>
                        </li>
                        <li class="py-2.5 px-6 hover:bg-blue-50 text-black text-sm cursor-pointer">
                          <button onClick={() => handleFilterOrders("paid")}>
                            Payment Status: Paid
                          </button>
                        </li>
                        <li class="py-2.5 px-6 hover:bg-blue-50 text-black text-sm cursor-pointer">
                          <button onClick={() => handleFilterOrders("pending")}>
                            Payment Status: Pending
                          </button>
                        </li>
                        <li class="py-2.5 px-6 hover:bg-blue-50 text-black text-sm cursor-pointer">
                          <button
                            onClick={() => handleFilterOrders("processing")}
                          >
                            Payment Status: Processing
                          </button>
                        </li>
                        <li class="py-2.5 px-6 hover:bg-blue-50 text-black text-sm cursor-pointer">
                          <button
                            onClick={() => handleFilterOrders("cancelled")}
                          >
                            Payment Status: Cancelled
                          </button>
                        </li>
                        <li class="py-2.5 px-6 hover:bg-blue-50 text-black text-sm cursor-pointer">
                          <hr />
                        </li>
                        <li class="py-2.5 px-6 hover:bg-blue-50 text-black text-sm cursor-pointer">
                          <button onClick={() => handleFilterOrders("latest")}>
                            Date: Latest
                          </button>
                        </li>
                        <li class="py-2.5 px-6 hover:bg-blue-50 text-black text-sm cursor-pointer">
                          <button onClick={() => handleFilterOrders("oldest")}>
                            Date: Oldest
                          </button>
                        </li>
                        <li class="py-2.5 px-6 hover:bg-blue-50 text-black text-sm cursor-pointer">
                          <hr />
                        </li>
                        <li class="py-2.5 px-6 hover:bg-blue-50 text-black text-sm cursor-pointer">
                          <button onClick={() => handleFilterOrders("Pending")}>
                            Delivery Status: Pending
                          </button>
                        </li>
                        <li class="py-2.5 px-6 hover:bg-blue-50 text-black text-sm cursor-pointer">
                          <button
                            onClick={() => handleFilterOrders("Processing")}
                          >
                            Delivery Status: Processing
                          </button>
                        </li>
                        <li class="py-2.5 px-6 hover:bg-blue-50 text-black text-sm cursor-pointer">
                          <button onClick={() => handleFilterOrders("Arrived")}>
                            Delivery Status: Arrived
                          </button>
                        </li>
                        <li class="py-2.5 px-6 hover:bg-blue-50 text-black text-sm cursor-pointer">
                          <button
                            onClick={() => handleFilterOrders("Delivered")}
                          >
                            Delivery Status: Delivered
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>

                  <table className="min-w-full bg-white font-[sans-serif] m-h-100">
                    <thead className="bg-[#3e4095] whitespace-nowrap">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                          #ID
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                          Payment Status
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                          Order Status
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="whitespace-nowrap divide-y divide-gray-200">
                      {orders?.map((o, index) => (
                        <tr className="hover:bg-blue-50" key={index}>
                          <td className="px-6 py-4 text-sm">#{o.oid}</td>
                          <td className="px-6 py-4 text-sm">{o.full_name}</td>
                          <td className="px-6 py-4 text-sm">
                            {moment(o.date).format("MMM D, YYYY")}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            {o.payment_status.toUpperCase()}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            {o.order_status}
                          </td>
                          <td className="px-6 py-4">
                            <Link to={`/vendor/orders/${o.oid}/`}>
                              <FaEye className="w-5 fill-blue-500 hover:fill-blue-700" />
                            </Link>
                          </td>
                        </tr>
                      ))}

                      {orders < 1 && (
                        <h5 className="mt-4 p-3">No orders yet</h5>
                      )}
                    </tbody>
                  </table>
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

export default VendorOrders;
