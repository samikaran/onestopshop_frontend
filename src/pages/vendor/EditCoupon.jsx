import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import apiInstance from "../../utils/axios";
import UserData from "../../components/plugin/UserData";
import Sidebar from "./Sidebar";
import Breadcrumb from "./Breadcrumb";
import { toast } from "react-toastify";

const EditCoupon = () => {
  const [coupon, setCoupon] = useState([]);

  if (UserData()?.vendor_id === 0) {
    window.location.href = "/vendor/register/";
  }

  const axios = apiInstance;
  const userData = UserData();
  const param = useParams();

  const fetchData = async () => {
    try {
      await axios
        .get(`vendor-coupon-detail/${userData?.vendor_id}/${param.id}`)
        .then((res) => {
          setCoupon(res.data);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateCouponChange = (event) => {
    setCoupon({
      ...coupon,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    });
    console.log(coupon);
  };

  const handleUpdateCoupon = async (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("vendor", userData?.vendor_id);
    formdata.append("code", coupon.code);
    formdata.append("discount", coupon.discount);
    formdata.append("active", coupon.active);

    await axios
      .patch(
        `vendor-coupon-detail/${userData?.vendor_id}/${param.id}/`,
        formdata
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Coupon updated successfully!");
        // Swal.fire({
        //   icon: "success",
        //   title: "Coupon Updated",
        // });
      });
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
              <Breadcrumb title="Edit Coupon" />

              {/* Contents Here */}
              <form
                className="space-y-4 font-[sans-serif] max-w-md mx-auto mt-5"
                onSubmit={handleUpdateCoupon}
              >
                <div className="mt-4">
                  <label className="mb-2 text-base">Code</label>
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded"
                    name="code"
                    onChange={handleUpdateCouponChange}
                    value={coupon.code}
                  />
                  <small id="emailHelp" className="form-text">
                    Eg: NEWYEAR20
                  </small>
                </div>
                <div className="mt-4">
                  <label className="mb-2 text-base">Discount</label>
                  <input
                    type="number"
                    className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-transparent focus:border-blue-500 rounded"
                    name="discount"
                    placeholder="Enter Discount"
                    onChange={handleUpdateCouponChange}
                    value={coupon.discount}
                  />
                  <small id="emailHelp" className="form-text">
                    NOTE: Discount is in <b>percentage</b>
                  </small>
                </div>
                <div className="flex">
                  <input
                    checked={coupon.active}
                    onChange={handleUpdateCouponChange}
                    name="active"
                    type="checkbox"
                    className="w-4"
                    id="exampleCheck1"
                  />
                  <label className="text-sm ml-4 ">Activate Coupon</label>
                </div>
                <div className="flex">
                  {/* <Link to={"/vendor/coupon/"}>Go Back</Link> */}
                  <button
                    type="submit"
                    className="!mt-8 w-full px-4 py-2.5 mx-auto block text-sm font-semibold bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Update Coupon
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditCoupon;
