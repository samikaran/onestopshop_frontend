import React from "react";
import Sidebar from "./Sidebar";
import Pagination from "./Pagination";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const Account = () => {
  return (
    <>
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-1 lg:py-12">
              <Sidebar route="dashboard" />
            </div>
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-4 lg:p-12">
              {/* <Breadcrumb title="Sample Layout" /> */}

              {/* Contents Here */}
              <div className="rounded-lg border border-gray-200">
                <div className="overflow-x-auto">
                  {/* <p>Total Orders: {orders.length || 0}</p>
                  <p>Pending Orders: {statusCounts.Pending || 0}</p>
                  <p>Fulfilled Orders: {statusCounts.Fulfilled || 0}</p> */}
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
                      <tr className="hover:bg-blue-50">
                        <td className="px-6 py-4 text-sm">John Doe</td>
                        <td className="px-6 py-4 text-sm">john@example.com</td>
                        <td className="px-6 py-4 text-sm">Admin</td>
                        <td className="px-6 py-4 text-sm">Admin</td>
                        <td className="px-6 py-4 text-sm">Admin</td>
                        <td className="px-6 py-4 text-sm">2022-05-15</td>
                        <td className="px-6 py-4">
                          <button className="mr-4" title="Edit">
                            {/* <Link to={"/"}> */}
                            <FiEdit className="w-5 text-blue-500 hover:text-blue-700" />
                            {/* </Link> */}
                          </button>
                          <button className="mr-4" title="Delete">
                            {/* <Link> */}
                            <RiDeleteBin6Line className="w-5 fill-red-500 hover:fill-red-700" />
                            {/* </Link> */}
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* <Pagination /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Account;
