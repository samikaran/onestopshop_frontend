import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";

import apiInstance from "../../../utils/axios";
import UserData from "../../plugin/UserData";

const CreateCouponModal = ({ setOpen, data }) => {
  const [createCoupons, setCreateCoupons] = useState({
    code: "",
    discount: "",
    active: true,
  });

  const axios = apiInstance;
  const userData = UserData();

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
        toast.success(res.data.message);
        setOpen(false);
      });
    await fetchData();
  };
  return (
    <>
      <div className="bg-[#fff]">
        {data ? (
          <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
            <div className="w-[90%] 800px:w-[30%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
              <RxCross1
                size={30}
                className="absolute right-3 top-3 z-50 hover:cursor-pointer"
                onClick={() => setOpen(false)}
              />
              <div className="block w-full 800px:flex">
                <div className="w-full 800px:w-[100%]">
                  {/* started */}

                  <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                    <div className="flex justify-start item-start space-y-2 flex-col py-4 border-b border-gray-200 w-full">
                      <h3 className="text-3xl dark:text-white lg:text-2xl font-semibold leading-7 lg:leading-9 text-gray-800">
                        Create Coupon
                      </h3>
                    </div>
                    <form
                      className="space-y-4 font-[sans-serif] max-w-md mx-auto mt-5"
                      onSubmit={handleCreateCoupon}
                    >
                      <div className="mt-4">
                        <label className="mb-2 text-base">Code</label>
                        <input
                          type="text"
                          placeholder="Enter coupon code"
                          className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded"
                          name="code"
                          onChange={handleCreateCouponChange}
                          value={createCoupons.code}
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
                          onChange={handleCreateCouponChange}
                          value={createCoupons.discount}
                        />
                        <small id="emailHelp" className="form-text">
                          NOTE: Discount is in <b>percentage</b>
                        </small>
                      </div>
                      <div className="flex">
                        <input
                          checked={createCoupons.active}
                          onChange={handleCreateCouponChange}
                          name="active"
                          type="checkbox"
                          className="w-4"
                          id="exampleCheck1"
                        />
                        <label className="text-sm ml-4 ">Activate Coupon</label>
                      </div>
                      <button
                        type="submit"
                        className="!mt-8 w-full px-4 py-2.5 mx-auto block text-sm font-semibold bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Create Coupon
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CreateCouponModal;
