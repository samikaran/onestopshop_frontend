import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import moment from "moment";
import Chart from "chart.js/auto";
import { Pie, Line } from "react-chartjs-2";

import apiInstance from "../../utils/axios";
import UserData from "../../components/plugin/UserData";
import Sidebar from "./Sidebar";
import Breadcrumb from "./Breadcrumb";
import Loader from "../../components/layouts/Loader";
import DashboardTab from "../../components/layouts/vendors/DashboardTab";
// import Swal from 'sweetalert2';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState(null);
  const [orders, setOrders] = useState(null);
  const [orderChartData, setOrderChartData] = useState(null);
  const [productsChartData, setProductsChartData] = useState(null);

  const axios = apiInstance;
  const userData = UserData();
  const navigate = useNavigate();

  // console.log(userData);

  if (UserData()?.vendor_id === 0) {
    window.location.href = "/vendor/register/";
  }

  if (userData?.vendor_id !== 0) {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `vendor/stats/${userData?.vendor_id}/`
          );
          setStats(response.data[0]);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }, []);

    useEffect(() => {
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

      fetchData();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `vendor/orders/${userData?.vendor_id}/`
          );
          setOrders(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }, []);
  }

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const order_response = await axios.get(
          `vendor-orders-report-chart/${userData?.vendor_id}/`
        );
        setOrderChartData(order_response.data);

        const product_response = await axios.get(
          `vendor-products-report-chart/${userData?.vendor_id}/`
        );
        setProductsChartData(product_response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChartData();
  }, []);

  // console.log(orderChartData);
  // console.log(productsChartData);

  const order_months = orderChartData?.map((item) => item.month);
  const order_counts = orderChartData?.map((item) => item.orders);

  const product_labels = productsChartData?.map((item) => item.month);
  const product_count = productsChartData?.map((item) => item.orders);

  const order_data = {
    labels: order_months,
    datasets: [
      {
        label: "Total Orders",
        data: order_counts,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const product_data = {
    labels: product_labels,
    datasets: [
      {
        label: "Total Products",
        data: product_count,
        fill: true,
        backgroundColor: "#ba9ede",
        borderColor: "#6100e0",
      },
    ],
  };

  console.log(order_data);

  return (
    <>
      {loading === false && (
        <section className="bg-gray-100">
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
              <div className="lg:col-span-1 lg:py-12">
                <Sidebar route="dashboard" />
              </div>
              <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-4 lg:p-12">
                {/* <Breadcrumb title="Dashboard" /> */}

                {/* Contents Here */}

                <div className="flex flex-row">
                  <div className="bg-no-repeat bg-[#98b0c3] border border-[#4a9bdc] rounded-xl w-full mr-2 p-6">
                    <p className="text-5xl text-indigo-900">
                      Welcome <br />
                      <strong>{userData?.full_name}</strong>
                    </p>
                    <div className="w-full mb-4 mb-lg-0 h-100 mt-5">
                      From your seller dashboard. you can easily create &amp;
                      update your <Link to={"/vendor/products/"}>products</Link>
                      , manage your profile
                      <Link to={""}>
                        <shipping address="" a="">
                          ,{" "}
                        </shipping>
                      </Link>
                      <Link to={""}>change password</Link> and{" "}
                      <Link to={""}>edit account</Link> infomations.
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 lg:gap-8 md:grid-cols-3 p-8 pt-10">
                  <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                        <span>Products</span>
                      </div>

                      <div className="text-3xl text-yellow-600 dark:text-gray-100">
                        {stats?.products || 0}
                      </div>
                    </div>
                  </div>

                  <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                        <span>Orders</span>
                      </div>

                      <div className="text-3xl text-red-600 dark:text-gray-100">
                        {stats?.orders || 0}
                      </div>
                    </div>
                  </div>

                  <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                        <span>Revenue</span>
                      </div>

                      <div className="text-3xl text-green-600 dark:text-gray-100">
                        ${stats?.revenue || 0}
                      </div>
                    </div>
                  </div>
                </div>

                <h1 className="mt-3 text-2xl tracking-tight text-slate-900">
                  Chart Analytics
                </h1>

                {/* <div className="grid grid-cols-2 gap-2 mt-10 mb-10"> */}
                <div className="grid gap-2 lg:gap-4 md:grid-cols-2 mt-10 mb-10">
                  <div className="">
                    <Line
                      data={order_data}
                      // style={{ height: 300, minWidth: "630px" }}
                    />
                  </div>
                  <div className="">
                    <Line
                      data={product_data}
                      // style={{ height: 300, minWidth: "630px" }}
                    />
                  </div>
                </div>

                <DashboardTab products={products} orders={orders} />
              </div>
            </div>
          </div>
        </section>
      )}
      {loading === true && <Loader />}
    </>
  );
};

export default Dashboard;
