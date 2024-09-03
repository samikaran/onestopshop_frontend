import React, { useState, useEffect } from "react";
import apiInstance from "../../utils/axios";
import UserData from "../../components/plugin/UserData";
import moment from "moment";

import Sidebar from "./Sidebar";
import Breadcrumb from "./Breadcrumb";
import Pagination from "./Pagination";
import { CgEye } from "react-icons/cg";
import { FaEye } from "react-icons/fa";
import Loader from "../../components/layouts/Loader";
import { toast } from "react-toastify";
// import Swal from "sweetalert2";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const axios = apiInstance;
  const userData = UserData();

  const fetchNoti = () => {
    axios.get(`customer/notification/${userData?.user_id}/`).then((res) => {
      setNotifications(res.data);
      if (notifications) {
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    fetchNoti();
  }, []);

  const MarkNotiAsSeen = (NotiId) => {
    axios
      .get(`customer/notification/${userData?.user_id}/${NotiId}/`)
      .then((res) => {
        fetchNoti();
      });

    // Swal.fire({
    //   icon: "success",
    //   text: "Notification Marked As Seen",
    // });
    toast.success("Notification Marked As Seen");
  };

  // console.log(notifications);

  return (
    <>
      {loading === false && (
        <section className="bg-gray-100">
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
              <div className="lg:col-span-1 lg:py-12">
                <Sidebar route="notifications" />
              </div>
              <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-4 lg:p-12">
                <Breadcrumb title="Notifications" />

                {/* Contents Here */}
                <div className="rounded-lg border border-gray-200">
                  <div className="overflow-x-auto flex flex-col gap-3">
                    {notifications.map((noti, index) => (
                      <div
                        className="relative border border-gray-200 rounded-lg shadow-lg mt-4"
                        key={index}
                      >
                        <small className="absolute p-1  -top-1 -right-1 mr-2">
                          {moment(noti.date).format("MMM D, YYYY")}
                        </small>

                        <div className="flex items-center p-4">
                          <div className="ml-3 overflow-hidden">
                            <p className="font-medium text-gray-900">
                              New Order
                            </p>
                            <p className="max-w-xs text-sm text-gray-500 truncate">
                              Your order #{noti?.order?.oid} was successfull
                            </p>
                            <small className="">
                              Total: ${noti?.order?.total}
                            </small>{" "}
                            <br />
                            <small className="">
                              Shipping: ${noti?.order?.shipping_amount}
                            </small>{" "}
                            <br />
                            <small className="">
                              Tax: ${noti?.order?.tax_fee}
                            </small>{" "}
                            <br />
                            <small className="">
                              Service Fee: ${noti?.order?.service_fee}
                            </small>{" "}
                            <br />
                            <button onClick={() => MarkNotiAsSeen(noti?.id)}>
                              <FaEye className="w-5 fill-blue-500 hover:fill-blue-700" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {notifications.length < 1 && (
                      <h6 className="py-10 px-2">No notifications yet!</h6>
                    )}
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

export default Notifications;
