import { React, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Swal from "sweetalert2";
import { FaSpinner } from "react-icons/fa";
import {
  API_BASE_URL,
  PAYPAL_CLIENT_ID,
  SERVER_URL,
} from "../../utils/constants";

import apiInstance from "../../utils/axios";
import GetCurrentAddress from "../../components/plugin/UserCountry";
import UserData from "../../components/plugin/UserData";
import CartID from "../../components/plugin/cartID";

const Checkout = () => {
  const [order, setOrder] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const axios = apiInstance;
  const userData = UserData();
  let cart_id = CartID();
  const param = useParams();
  console.log(param);
  let navigate = useNavigate();

  const fetchOrderData = () => {
    axios.get(`checkout/${param?.order_oid}/`).then((res) => {
      setOrder(res.data);
    });
  };

  useEffect(() => {
    fetchOrderData();
    // axios.get(`checkout/${param?.order_oid}/`).then((res) => {
    //   setOrder(res.data);
    // });
  }, [loading]);

  const initialOptions = {
    clientId: PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture",
  };

  // console.log(order);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "couponCode":
        setCouponCode(value);
        break;

      default:
        break;
    }
  };

  const applyCoupon = async () => {
    console.log(couponCode);
    setLoading(true);

    const formdata = new FormData();
    formdata.append("order_oid", order.oid);
    formdata.append("coupon_code", couponCode);

    try {
      const response = await axios.post("coupon/", formdata);
      fetchOrderData();
      console.log(response.data);
      if (response.data.message === "Coupon Activated") {
        setLoading(false);

        Swal.fire({
          icon: "success",
          title: response.data.message,
          text: "A new coupon has been applied to your order",
        });
      }

      if (response.data.message === "Coupon Already Activated") {
        setLoading(false);

        Swal.fire({
          icon: "warning",
          title: response.data.message,
          text: "This coupon has been already activated!",
        });
      }
      setCouponCode("");
    } catch (error) {
      console.log(error.response.data.message);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
        text: "This coupon does not exist!",
      });
      setCouponCode("");
    }
  };

  const payWithStripe = (event) => {
    // event.preventDefault();
    setPaymentLoading(true);
    event.target.form.submit();
  };

  return (
    <>
      <section className="mx-auto max-w-screen-xl font-[roboto] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 ">
        <div className="container mx-auto mt-10">
          <div className="sm:flex shadow-md my-10">
            <div className="  w-full  sm:w-3/4 bg-white px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">
                  Review Your Shipping & Order Details
                </h1>
                {/* <h2 className="font-semibold text-2xl">3 Items</h2> */}
              </div>

              <Link
                to="/cart/"
                className="flex font-semibold text-[#3e4095] text-sm mt-10"
              >
                <svg
                  className="fill-current mr-2 text-[#3e4095] w-4"
                  viewBox="0 0 448 512"
                >
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>{" "}
                <i className="fas fa-shopping-cart"></i> Edit Cart
              </Link>

              <div className="border-t mt-8">
                <div className="w-full max-w-3xl mx-auto p-8">
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
                        Contact Information
                      </h2>
                      <div className="mt-4">
                        <label
                          htmlFor="address"
                          className="block text-gray-700 dark:text-white mb-1"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                          readOnly
                          value={order.full_name}
                        />
                      </div>
                      <div className="mt-4">
                        <label
                          htmlFor="address"
                          className="block text-gray-700 dark:text-white mb-1"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                          readOnly
                          value={order.email}
                        />
                      </div>
                      <div className="mt-4">
                        <div>
                          <label
                            htmlFor="mobile"
                            className="block text-gray-700 dark:text-white mb-1"
                          >
                            Mobile
                          </label>
                          <input
                            type="text"
                            id="mobile"
                            name="mobile"
                            className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                            readOnly
                            value={order.mobile}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
                        Shipping Address
                      </h2>
                      <div className="mt-4">
                        <label
                          htmlFor="address"
                          className="block text-gray-700 dark:text-white mb-1"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                          readOnly
                          value={order.address}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <label
                            htmlFor="city"
                            className="block text-gray-700 dark:text-white mb-1"
                          >
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                            readOnly
                            value={order.city}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="state"
                            className="block text-gray-700 dark:text-white mb-1"
                          >
                            State
                          </label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                            readOnly
                            value={order.state}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <label
                            htmlFor="zip"
                            className="block text-gray-700 dark:text-white mb-1"
                          >
                            ZIP/Postal Code
                          </label>
                          <input
                            type="text"
                            id="zip"
                            name="zip"
                            className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                            readOnly
                            value={order.zip}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="country"
                            className="block text-gray-700 dark:text-white mb-1"
                          >
                            Country
                          </label>
                          <input
                            type="text"
                            id="country"
                            name="country"
                            className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                            readOnly
                            value={order.country}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="summary"
              className=" w-full   sm:w-1/4   md:w-1/2     px-8 py-10"
            >
              <h1 className="font-semibold text-2xl border-b pb-8">
                Order Summary
              </h1>
              {/* <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Subtotal
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      $56.00
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Discount{" "}
                      <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">
                        STUDENT
                      </span>
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      -$28.00 (50%)
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Shipping
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      $8.00
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                    Total
                  </p>
                  <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                    $36.00
                  </p>
                </div>
              </div> */}
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">
                  Subtotal
                </span>
                <span className="text-sm">${order.sub_total}</span>
              </div>
              {/* <div className="flex justify-between  mb-5">
                <span className="font-semibold text-sm uppercase">
                  Shipping
                </span>
                <span className="text-sm">$56.00</span>
              </div> */}
              <div className="flex justify-between  mb-5">
                <span className="font-semibold text-sm uppercase">Tax Fee</span>
                <span className="text-sm">${order.tax_fee}</span>
              </div>
              <div className="flex justify-between  mb-5">
                <span className="font-semibold text-sm uppercase">
                  Service Fee
                </span>
                <span className="text-sm">${order.service_fee}</span>
              </div>
              <div className="flex justify-between  mb-5">
                <span className="font-semibold text-sm uppercase">
                  Shipping Fee
                </span>
                <span className="text-sm">${order.shipping_amount}</span>
              </div>
              {order?.saved !== "0.00" && (
                <div className="flex justify-between mb-5 text-[#ff4747] ">
                  <span className="font-semibold text-sm uppercase">
                    Discount
                  </span>
                  <span className="text-sm">-${order.saved}</span>
                </div>
              )}

              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                  <span>${order.total}</span>
                </div>
                <form
                  action={`${API_BASE_URL}stripe-checkout/${param?.order_oid}/`}
                  method="POST"
                >
                  {paymentLoading === true && (
                    <button
                      type="submit"
                      className="bg-[#8e8e8f] font-semibold hover:bg-[#8e8e8f] py-3 text-sm text-white uppercase w-full text-center"
                      onClick={payWithStripe}
                      disabled
                    >
                      Processing ...
                    </button>
                  )}
                  {paymentLoading === false && (
                    <button
                      type="submit"
                      className="bg-[#3e4095] font-semibold hover:bg-[#f58634] py-3 text-sm text-white uppercase w-full"
                      onClick={payWithStripe}
                    >
                      Pay with Stripe
                    </button>
                  )}
                </form>
              </div>

              <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                  className="mt-3"
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "USD",
                            value: order.total.toString(),
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      const name = details.payer.name.given_name;
                      const status = details.status;
                      const payapl_order_id = data.orderID;

                      console.log(status);
                      if (status === "COMPLETED") {
                        navigate(
                          `/payment-success/${order.oid}/?payapl_order_id=${payapl_order_id}`
                        );
                      }
                    });
                  }}
                />
              </PayPalScriptProvider>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700 mt-10">
                <div className="">
                  <label
                    htmlFor="promo"
                    className="font-semibold inline-block mb-3 text-sm uppercase"
                  >
                    Promo Code
                  </label>
                </div>
                {loading === true && (
                  <>
                    <input
                      type="text"
                      id="promo"
                      placeholder="Enter your code"
                      className="p-2 text-sm w-full rounded-lg shadow-md border mb-2 text-[#000] bg-[#bfbdbd] "
                      value={couponCode}
                      readOnly
                    />
                    <button
                      className="bg-[#747272] hover:bg-[#747272] px-5 py-2 text-sm text-white uppercase"
                      disabled
                    >
                      Apply
                    </button>
                  </>
                )}
                {loading === false && (
                  <>
                    <input
                      type="text"
                      id="promo"
                      name="couponCode"
                      placeholder="Enter your code"
                      className="p-2 text-sm w-full rounded-lg shadow-md border mb-2"
                      value={couponCode}
                      onChange={handleChange}
                    />
                    <button
                      className="bg-[#f58634] hover:bg-[#3e4095] px-5 py-2 text-sm text-white uppercase"
                      onClick={applyCoupon}
                    >
                      Apply
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
