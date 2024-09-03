import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";

import apiInstance from "../../utils/axios";
import UserData from "../../components/plugin/UserData";
import Sidebar from "./Sidebar";
import Breadcrumb from "./Breadcrumb";
import Loader from "../../components/layouts/Loader";

const Earning = () => {
  const [earningStats, setEarningStats] = useState(null);
  const [earningStatsTracker, setEarningTracker] = useState([]);
  const [earningChartData, setEarningChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  if (UserData()?.vendor_id === 0) {
    window.location.href = "/vendor/register/";
  }

  const axios = apiInstance;
  const userData = UserData();

  useEffect(() => {
    const fetEarningStats = async () => {
      axios.get(`vendor-earning/${userData?.vendor_id}/`).then((res) => {
        setEarningStats(res.data[0]);
        setLoading(false);
      });

      axios
        .get(`vendor-monthly-earning/${userData?.vendor_id}/`)
        .then((res) => {
          setEarningTracker(res.data);
          setEarningChartData(res.data);
          setLoading(false);
        });
    };
    fetEarningStats();
  }, []);

  const months = earningChartData?.map((item) => item.month);
  const revenue = earningChartData?.map((item) => item.total_earning);
  const sales_count = earningChartData?.map((item) => item.sales_count);

  const revenue_data = {
    labels: months,
    datasets: [
      {
        label: "Revenue Analytics",
        data: revenue,
        fill: true,
        backgroundColor: "#cdb9ed",
        borderColor: "#6203fc",
      },
    ],
  };

  return (
    <>
      {loading === false && (
        <section className="bg-gray-100">
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
              <div className="lg:col-span-1 lg:py-12">
                <Sidebar route="earning" />
              </div>
              <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-4 lg:p-12">
                <Breadcrumb title="Earnings" />

                {/* Contents Here */}
                <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-4 lg:p-12">
                  <div className="grid gap-4 lg:gap-8 md:grid-cols-2 p-2">
                    <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                          <span>Total Sales</span>
                        </div>

                        <div className="text-3xl text-yellow-600 dark:text-gray-100">
                          ${earningStats?.total_revenue || "0.00"}
                        </div>
                      </div>
                    </div>

                    <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                          <span>Monthly Earning</span>
                        </div>

                        <div className="text-3xl text-red-600 dark:text-gray-100">
                          ${earningStats?.monthly_revenue || "0.00"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <h1 className="mt-3 text-2xl tracking-tight text-slate-900">
                    Revenue Tracker
                  </h1>
                  <div className="overflow-x-auto mt-5">
                    <table className="min-w-full bg-white font-[sans-serif]">
                      <thead className="bg-[#3e4095] whitespace-nowrap">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                            Month
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                            Sales
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                            Revenue
                          </th>
                        </tr>
                      </thead>
                      <tbody className="whitespace-nowrap divide-y divide-gray-200">
                        {earningStatsTracker?.map((earning, index) => (
                          <tr>
                            {earning.month == 1 && <td>January </td>}
                            {earning.month == 2 && <td>February </td>}
                            {earning.month == 3 && <td>March </td>}
                            {earning.month == 4 && <td>April </td>}
                            {earning.month == 5 && <td>May </td>}
                            {earning.month == 6 && <td>June </td>}
                            {earning.month == 7 && <td>July </td>}
                            {earning.month == 8 && <td>August </td>}
                            {earning.month == 9 && <td>September </td>}
                            {earning.month == 10 && <td>October </td>}
                            {earning.month == 11 && <td>November </td>}
                            {earning.month == 12 && <td>December </td>}
                            <td>{earning.sales_count}</td>
                            <td>${earning.total_earning.toFixed(2)}</td>
                            {/* <td>
                            <a href="" className="btn btn-primary mb-1">
                              <i className="fas fa-eye" />
                            </a>
                          </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <h1 className="text-2xl tracking-tight text-slate-900 mt-10">
                    Revenue Analytics
                  </h1>
                  <div className="grid gap-2 lg:gap-4 md:grid-cols-1 mt-10 mb-10">
                    <div className="">
                      <Line
                        data={revenue_data}
                        // style={{ height: 300, minWidth: "630px" }}
                      />
                    </div>
                  </div>
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

export default Earning;
