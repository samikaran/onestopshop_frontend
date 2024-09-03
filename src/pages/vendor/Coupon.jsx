import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import apiInstance from "../../utils/axios";
import UserData from "../../components/plugin/UserData";
import Sidebar from "./Sidebar";
import Breadcrumb from "./Breadcrumb";
import { IoIosAddCircleOutline } from "react-icons/io";
import CreateCouponModal from "../../components/layouts/vendors/CreateCouponModal";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Coupon = () => {
  const [stats, setStats] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [createCoupons, setCreateCoupons] = useState({
    code: "",
    discount: "",
    active: true,
  });
  const [click, setClick] = useState("");
  const [open, setOpen] = useState(false);

  if (UserData()?.vendor_id === 0) {
    window.location.href = "/vendor/register/";
  }

  const axios = apiInstance;
  const userData = UserData();

  const fetchData = async () => {
    try {
      await axios
        .get(`vendor-coupon-list/${userData?.vendor_id}/`)
        .then((res) => {
          setCoupons(res.data);
        });

      await axios
        .get(`vendor-coupon-list/${userData?.vendor_id}/`)
        .then((res) => {
          setCoupons(res.data);
        });

      await axios
        .get(`vendor-coupon-stats/${userData?.vendor_id}/`)
        .then((res) => {
          setStats(res.data[0]);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteCoupon = async (couponId) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Delete Coupon?",
      text: "Are you sure you want to permanently delete this coupon?",
      confirmButtonText: "Yes, delete it!",
      showCancelButton: true,
    });
    if (result.isConfirmed) {
      await axios
        .delete(`vendor-coupon-detail/${userData?.vendor_id}/${couponId}`)
        .then((res) => {
          console.log(res.data);
          toast.success("Coupon deleted successfully!");
        });
      await fetchData();
    } else if (result.isDenied) {
      toast.error(
        "An error occurred while deleting the product. Please try again later."
      );
      // reject(new Error("Deletion canceled or failed."));
    }
  };

  const handleCreateCouponChange = (event) => {
    setCreateCoupons({
      ...createCoupons,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    });
    console.log(createCoupons);
  };

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("vendor_id", userData?.vendor_id);
    formdata.append("code", createCoupons.code);
    formdata.append("discount", createCoupons.discount);
    formdata.append("active", createCoupons.active);

    await axios
      .post(`vendor-coupon-create/${userData?.vendor_id}/`, formdata)
      .then((res) => {
        console.log(res.data);
      });
    await fetchData();
  };

  return (
    <>
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-1 lg:py-12">
              <Sidebar route="coupon" />
            </div>
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-4 lg:p-12">
              {/* <Breadcrumb title="Coupons" /> */}

              <div className="flex items-center justify-between mt-4 text-sm text-gray-600 fill-current">
                <h1 className="flex items-center mt-3 text-2xl font-extrabold tracking-tight text-slate-900">
                  Coupons
                </h1>
                <div className="flex items-center">
                  <IoIosAddCircleOutline />
                  <span className="ml-2">
                    <button onClick={() => setOpen(!open)}>Add Coupon</button>
                  </span>
                </div>
              </div>
              {open ? (
                <CreateCouponModal setOpen={setOpen} data={coupons} />
              ) : null}
              <hr className="mt-4" />

              {/* Contents Here */}

              <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-4 lg:p-12">
                <div className="grid gap-4 lg:gap-8 md:grid-cols-2 p-2">
                  <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                        <span>Total Coupons</span>
                      </div>

                      <div className="text-3xl text-yellow-600 dark:text-gray-100">
                        {stats.total_coupons}
                      </div>
                    </div>
                  </div>

                  <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                        <span>Active Coupons</span>
                      </div>

                      <div className="text-3xl text-red-600 dark:text-gray-100">
                        {stats.active_coupons}
                      </div>
                    </div>
                  </div>
                </div>

                <h1 className="mt-3 text-2xl tracking-tight text-slate-900">
                  Coupons
                </h1>
                <div className="overflow-x-auto mt-5">
                  <table className="min-w-full bg-white font-[sans-serif]">
                    <thead className="bg-[#3e4095] whitespace-nowrap">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                          Code
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                          Discount
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="whitespace-nowrap divide-y divide-gray-200">
                      {coupons.map((coupon, index) => (
                        <tr key={index}>
                          <td>{coupon.code}</td>
                          <td>Percentage</td>
                          <td>{coupon.discount}%</td>
                          <td>
                            {coupon.active === true ? (
                              <p>Active</p>
                            ) : (
                              <p>In-active</p>
                            )}
                          </td>
                          <td className="px-6 py-4 flex">
                            <Link
                              to={`/vendor/coupon/${coupon.id}/`}
                              className="mr-2"
                              title="Edit"
                            >
                              <FiEdit className="w-5 text-green-500 hover:text-green-700" />
                            </Link>
                            <button
                              onClick={() => handleDeleteCoupon(coupon.id)}
                            >
                              <RiDeleteBin6Line className="w-5 fill-red-500 hover:fill-red-700" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    {coupons < 1 && (
                      <h5 className="mt-4 p-3">No coupons yet</h5>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Coupon;
