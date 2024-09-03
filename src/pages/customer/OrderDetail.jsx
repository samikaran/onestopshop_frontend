import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Breadcrumb from "./Breadcrumb";
import apiInstance from "../../utils/axios";
import UserData from "../../components/plugin/UserData";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/layouts/Loader";

const OrderDetail = () => {
  const [order, setOrder] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const axios = apiInstance;
  const userData = UserData();
  const param = useParams();
  console.log(param);

  useEffect(() => {
    axios
      .get(`customer/order/detail/${userData?.user_id}/${param?.order_oid}`)
      .then((res) => {
        setOrder(res.data);
        setOrderItems(res.data.orderitem);
        if (order) {
          setLoading(false);
        }
      });
  }, []);

  console.log(order);

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
                {/* <Breadcrumb title="Settings" /> */}

                {/* Contents Here */}

                <div className="bg-[#F7F7F7] text-[#333] font-[sans-serif]">
                  <div className="max-w-6xl mx-auto py-16 px-4">
                    <h2 className="text-4xl font-extrabold text-center mb-16">
                      #{order.oid}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 max-md:max-w-md mx-auto">
                      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                        <div className="p-6">
                          <p className="text-gray-500 text-sm mb-2">Total</p>
                          <h3 className="text-xl font-semibold ">
                            ${order.total}
                          </h3>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                        <div className="p-6">
                          <p className="text-gray-500 text-sm mb-2">
                            Payment Status
                          </p>
                          <h3 className="text-xl font-semibold ">
                            {order.payment_status?.toUpperCase()}
                          </h3>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                        <div className="p-6">
                          <p className="text-gray-500 text-sm mb-2">
                            Order Status
                          </p>
                          <h3 className="text-xl font-semibold ">
                            {order.order_status}
                          </h3>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                        <div className="p-6">
                          <p className="text-gray-500 text-sm mb-2">
                            Shipping Amount
                          </p>
                          <h3 className="text-xl font-semibold ">
                            ${order.shipping_amount}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-md:max-w-md mx-auto mt-10">
                      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                        <div className="p-6">
                          <p className="text-gray-500 text-sm mb-2">Tax Fee</p>
                          <h3 className="text-xl font-semibold ">
                            ${order.tax_fee}
                          </h3>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                        <div className="p-6">
                          <p className="text-gray-500 text-sm mb-2">
                            Service Fee
                          </p>
                          <h3 className="text-xl font-semibold ">
                            ${order.service_fee}
                          </h3>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                        <div className="p-6">
                          <p className="text-gray-500 text-sm mb-2">
                            Discount Fee
                          </p>
                          <h3 className="text-xl font-semibold ">
                            -${order.saved}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product list here */}
                <div className="overflow-x-auto">
                  {/* <p>Total Orders: {orders.length || 0}</p>
                  <p>Pending Orders: {statusCounts.Pending || 0}</p>
                  <p>Fulfilled Orders: {statusCounts.Fulfilled || 0}</p> */}
                  <table className="min-w-full bg-white font-[sans-serif]">
                    <thead className="bg-[#3e4095] whitespace-nowrap">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                          Qty
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                          Total
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-red-400">
                          Discount
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="whitespace-nowrap divide-y divide-gray-200">
                      {orderItems?.map((order, index) => (
                        <tr className="hover:bg-blue-50" key={index}>
                          <td className="px-6 py-4 text-sm flex items-center">
                            <img
                              src={order?.product?.image}
                              className="h-20 w-20 border-r-50 object-cover "
                              alt=""
                            />
                            <Link
                              to={`/product/${order.product.slug}/${order.product.id}`}
                              className="fw-bold text-dark ms-2 mb-0"
                              title={order?.product?.title}
                            >
                              {order?.product?.title.length > 30
                                ? order?.product?.title.slice(0, 30) + "..."
                                : order?.product?.title}
                            </Link>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            ${order.product.price}
                          </td>
                          <td className="px-6 py-4 text-sm">{order.qty}</td>
                          <td className="px-6 py-4 text-sm">
                            ${order.sub_total}
                          </td>
                          <td className="px-6 py-4 text-sm text-red-400">
                            -${order.saved}
                          </td>
                          <td className="px-6 py-4">
                            {order.tracking_id == null ||
                            order.tracking_id == "undefined" ? (
                              <button disabled>No Tracking Yet</button>
                            ) : (
                              <Link
                                to={`${order.delivery_couriers?.tracking_website}?${order.delivery_couriers?.url_parameter}=${order.tracking_id}`}
                                className=""
                                title="View"
                              >
                                {/* <FaEye className="w-5 fill-blue-500 hover:fill-blue-700" /> */}
                                Track Item
                              </Link>
                            )}
                          </td>
                        </tr>
                      ))}
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

export default OrderDetail;
