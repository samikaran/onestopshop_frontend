import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import apiInstance from "../../utils/axios";
import UserData from "../../components/plugin/UserData";

const VendorRegister = () => {
  if (UserData()?.vendor_id !== 0) {
    window.location.href = "/vendor/dashboard/";
  }

  const [vendor, setVendor] = useState({
    image: null,
    name: "",
    email: "",
    description: "",
    mobile: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setVendor({
      ...vendor,
      [event.target.name]: event.target.value,
    });
    console.log(vendor);
  };

  const handleFileChange = (event) => {
    setVendor({
      ...vendor,
      [event.target.name]: event.target.files[0],
    });
  };

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    setIsLoading(true);

    formdata.append("image", vendor.image);
    formdata.append("name", vendor.name);
    formdata.append("email", vendor.email);
    formdata.append("description", vendor.description);
    formdata.append("mobile", vendor.mobile);
    formdata.append("user_id", UserData()?.user_id);

    await apiInstance.post(`vendor-register/`, formdata, config).then((res) => {
      console.log(res.data.message);
      if (res.data.message == "Created vendor account") {
        // Swal.fire({
        //   icon: "success",
        //   title: "Vendor Account Created Successfully",
        //   text: "Login to continue to dashboard",
        // });
        toast.success(
          "You have successfully requested to create seller account, it may takes 1-2 business day(s) to verify your business account."
        );
        setIsLoading(false);
        navigate("/logout");
      }
    });
  };

  return (
    <>
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              <h1 className="text-center text-2xl font-bold text-[#000] sm:text-3xl">
                Register Vendor Account
              </h1>
              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label
                        htmlFor="image"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Shop Avatar
                      </label>
                      <div className="mt-1">
                        <input
                          type="file"
                          name="image"
                          required
                          onChange={handleFileChange}
                          placeholder="Shop Avatar"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Shop Name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="name"
                          required
                          onChange={handleInputChange}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Shop Email Address
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          name="email"
                          autoComplete="email"
                          required
                          onChange={handleInputChange}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="mobile"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Shop Contact Number
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="mobile"
                          autoComplete="mobile"
                          required
                          onChange={handleInputChange}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Shop Description
                      </label>
                      <div className="mt-1 relative">
                        <textarea
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          onChange={handleInputChange}
                          name="description"
                          id=""
                          cols="30"
                          rows="10"
                        ></textarea>
                      </div>
                    </div>
                    <div>
                      {isLoading ? (
                        <>
                          <button
                            type="button"
                            disabled
                            className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-700"
                          >
                            Processing...
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="submit"
                            className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#f58634] hover:bg-[#3e4095]"
                          >
                            Create Shop
                          </button>
                        </>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 lg:py-12">
              <p className="max-w-xl text-lg">
                Welcome to OneStopShop! Ready to start selling and enjoying
                exclusive benefits? Fill out the form to create your business
                account and unlock a world of amazing sales and growth of your
                business.
              </p>
              <p className="max-w-xl text-lg">
                Join our community of savvy shoppers and gain access to features
                like saved carts, order tracking, and personalized
                recommendations tailored just for you.
              </p>

              <div className="mt-8">
                <a href="#" className="text-2xl font-bold text-[#3e4095]">
                  {" "}
                  Happy selling!{" "}
                </a>

                <address className="mt-2 not-italic">:-)</address>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VendorRegister;
