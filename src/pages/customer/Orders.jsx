import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import Sidebar from "./Sidebar";
import Breadcrumb from "./Breadcrumb";
import { FaEye } from "react-icons/fa";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import apiInstance from "../../utils/axios";
import UserData from "../../components/plugin/UserData";
import Pagination from "./Pagination";
import Loader from "../../components/layouts/Loader";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const axios = apiInstance;
  const userData = UserData();

  useEffect(() => {
    axios.get(`customer/orders/${userData?.user_id}/`).then((res) => {
      setOrders(res.data);
      if (orders) {
        setLoading(false);
      }
    });
  }, []);

  // console.log(orders);

  const statusCounts = orders.reduce((counts, order) => {
    const status = order.order_status;
    counts[status] = (counts[status] || 0) + 1;
    return counts;
  }, {});

  // console.log("Total Orders: " + orders.length || 0);
  // console.log("Pending Orders: " + statusCounts.Pending || 0);
  // console.log("Fulfilled Orders: " + statusCounts.Fulfilled || 0);

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

            <div className="rounded-lg border border-gray-200">
              <div className="overflow-x-auto">
                {/* <p>Total Orders: {orders.length || 0}</p>
                  <p>Pending Orders: {statusCounts.Pending || 0}</p>
                  <p>Fulfilled Orders: {statusCounts.Fulfilled || 0}</p> */}
                <table className="min-w-full bg-white font-[sans-serif]">
                  <thead className="bg-[#3e4095] whitespace-nowrap">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                        Payment Status
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                        Order Status
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="whitespace-nowrap divide-y divide-gray-200">
                    {orders.map((o, index) => (
                      <tr className="hover:bg-blue-50" key={index}>
                        <td className="px-6 py-4 text-sm">
                          #{o.oid}
                          <br />
                          <small className="text-xs">
                            {moment(o.date).format("MMM D, YYYY")}
                          </small>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {o.payment_status.toUpperCase()}
                        </td>
                        <td className="px-6 py-4 text-sm">{o.order_status}</td>
                        <td className="px-6 py-4 text-sm">${o.total}</td>
                        <td className="px-6 py-4 ">
                          <div className="flex">
                          <Link
                            to={`/customer/order/detail/${o.oid}/`}
                            className=""
                            title="View"
                          >
                            <FaEye className="w-5 fill-blue-500 hover:fill-blue-700" />
                          </Link>
                          <Link
                            to={`/invoice/${o.oid}/`}
                            className=""
                            title="Invoice"
                          >
                            <LiaFileInvoiceDollarSolid className="w-5 fill-green-500 hover:fill-green-700" />
                          </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

export default Orders;
