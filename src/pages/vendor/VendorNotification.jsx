import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

import apiInstance from "../../utils/axios";
import UserData from "../../components/plugin/UserData";
import Sidebar from "./Sidebar";
import Breadcrumb from "./Breadcrumb";
import { FaCheck, FaEye } from "react-icons/fa";
import { CiUnread } from "react-icons/ci";
import { toast } from "react-toastify";

const VendorNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [notificationStats, setNotificationStats] = useState([]);
  const [seenNotification, setSeenNotifications] = useState([]);

  const axios = apiInstance;
  const userData = UserData();

  if (UserData()?.vendor_id === 0) {
    window.location.href = "/vendor/register/";
  }

  const fetchUnseenData = async () => {
    try {
      const response = await axios.get(
        `vendor-notifications-unseen/${userData?.vendor_id}/`
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchSeenData = async () => {
    try {
      const response = await axios.get(
        `vendor-notifications-seen/${userData?.vendor_id}/`
      );
      setSeenNotifications(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchStatsData = async () => {
    try {
      const response = await axios.get(
        `vendor-notifications-summary/${userData?.vendor_id}/`
      );
      setNotificationStats(response.data[0]);
    } catch (error) {
      console.error("Error fetching stats data:", error);
    }
  };

  useEffect(() => {
    fetchUnseenData();
  }, [userData?.vendor_id]);

  useEffect(() => {
    fetchSeenData();
  }, [userData?.vendor_id]);

  useEffect(() => {
    fetchStatsData();
  }, [userData?.vendor_id]);

  const handleNotificationSeenStatus = async (notiId) => {
    try {
      const response = await axios.get(
        `vendor-notifications-mark-as-seen/${userData?.vendor_id}/${notiId}/`
      );
      console.log(response.data);
      await fetchStatsData();
      await fetchUnseenData();
      await fetchSeenData();
      toast.success("Notification marked as seen");
    } catch (error) {
      console.error("Error marking notification as seen:", error);
    }
  };

  return (
    <>
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-1 lg:py-12">
              <Sidebar route="notifications" />
            </div>
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-4 lg:p-12">
              <Breadcrumb title="Notifications" />

              {/* Contents Here */}

              <div className="grid gap-4 lg:gap-8 md:grid-cols-3 p-8 ">
                <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                      <span>Un-read Notification</span>
                    </div>

                    <div className="text-3xl text-yellow-600 dark:text-gray-100">
                      {notificationStats.un_read_noti}
                    </div>
                  </div>
                </div>

                <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                      <span>Read Notification</span>
                    </div>

                    <div className="text-3xl text-red-600 dark:text-gray-100">
                      {notificationStats.read_noti}
                    </div>
                  </div>
                </div>

                <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                      <span>All Notification</span>
                    </div>

                    <div className="text-3xl text-green-600 dark:text-gray-100">
                      {notificationStats.all_noti}
                    </div>
                  </div>
                </div>
              </div>

              <h1 className="mt-3 text-2xl tracking-tight text-slate-900">
                Notification List
              </h1>

              <div className="overflow-x-auto mt-5">
                <table className="min-w-full bg-white font-[sans-serif]">
                  <thead className="bg-[#3e4095] whitespace-nowrap">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                        Message
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="whitespace-nowrap divide-y divide-gray-200">
                    {notifications?.map((noti, index) => (
                      <tr className="hover:bg-blue-50" key={index}>
                        <td>
                          {noti.order !== null && (
                            <p>New Order {noti?.order?.oid}</p>
                          )}
                        </td>
                        <td title={noti?.order_item?.product?.title}>
                          {noti.order_item !== null && (
                            <p>
                              You've got a new order for{" "}
                              <b>
                                {noti?.order_item?.product?.title.length > 40
                                  ? noti?.order_item?.product?.title.slice(
                                      0,
                                      40
                                    ) + "..."
                                  : noti?.order_item?.product?.title}
                              </b>
                            </p>
                          )}
                        </td>
                        <td className="flex">
                          {noti.seen === true ? (
                            <p>
                              Read
                              {/* <FaEye /> */}
                            </p>
                          ) : (
                            <p>
                              Unread
                              {/* <CiUnread /> */}
                            </p>
                          )}
                        </td>
                        <td>{moment(noti.date).format("MMM D, YYYY")}</td>
                        <td className="px-6 py-4 flex">
                          {noti.seen === true ? (
                            <button disabled className="btn btn-success mb-1">
                              <FaCheck />
                            </button>
                          ) : ( 
                            <button
                              onClick={() =>
                                handleNotificationSeenStatus(noti.id)
                              }
                              className="btn btn-secondary mb-1"
                            >
                              <FaEye />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {notifications.length < 1 && (
                    <h4 className="mt-4 p-3">No Notification Yet</h4>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VendorNotification;
