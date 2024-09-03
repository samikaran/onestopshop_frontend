import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import apiInstance from "../../utils/axios";
import OrderSummaryModal from "../../components/layouts/products/OrderSummaryModal";

const PaymentSuccess = () => {
  const [loading, setIsLoading] = useState(true);
  const [orderResponse, setOrderResponse] = useState([]);
  const [order, setOrder] = useState([]);
  const [click, setClick] = useState("");
  const [open, setOpen] = useState(false);

  const axios = apiInstance;
  const param = useParams();

  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get("session_id");
  const payaplOrderId = urlParams.get("payapl_order_id");

  console.log(param);
  console.log(sessionId);
  // console.log(payaplOrderId);

  // Get order details
  useEffect(() => {
    axios.get(`checkout/${param?.order_oid}/`).then((res) => {
      setOrder(res.data);
    });
  }, [param]);

  // Payment Processing
  useEffect(() => {
    const formData = new FormData();
    formData.append("order_oid", param?.order_oid);
    formData.append("session_id", sessionId);
    formData.append("payapl_order_id", payaplOrderId);

    setIsLoading(true);

    axios.post(`payment-success/`, formData).then((res) => {
      setOrderResponse(res.data);
      if (res.data.message === "Payment Successfull") {
        setIsLoading(false);
      }

      if (res.data.message === "Already Paid") {
        setIsLoading(false);
      }
    });
  }, [param?.order_oid]);

  console.log(orderResponse);

  return (
    <>
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center py-8">
          {loading === true && (
            <>
              <h1 className="text-3xl font-bold text-[#27872d]">Pending...</h1>
              <p className="text-gray-700 mt-4">
                We are verifying your payment, please hold on :)
              </p>
              <p className="text-[#ff0000]">
                Note: Do not reload or leave this page while verifying the
                payment.
              </p>
            </>
          )}
          {orderResponse.message === "Already Paid" && loading == false && (
            <>
              <h1 className="text-3xl font-bold text-[#27872d]">
                Already Paid!
              </h1>
              <p className="text-gray-700 mt-4">
                You have already paid for this order, Thank you!
              </p>
            </>
          )}
          {orderResponse.message === "unpaid!" && loading == false && (
            <>
              <h1 className="text-3xl font-bold text-[#ff0000]">
                Unpaid Invoice!
              </h1>
              <p className="text-gray-700 mt-4">
                Please try making the payment again.
              </p>
            </>
          )}
          {orderResponse.message === "Payment Successfull" &&
            loading == false && (
              <>
                <h1 className="text-3xl font-bold text-[#27872d]">
                  Payment Successful!
                </h1>
                <p className="text-gray-700 mt-4">
                  {/* Your order <b> #{order.oid} </b> for ${order.total} has been
            successfully placed. */}
                  Your checkout was successfull, we have sent the order detail
                  to your email{" "}
                </p>
              </>
            )}
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="px-4 py-2 bg-[#f58634] text-white rounded hover:bg-[#3e4095]"
            onClick={() => setOpen(!open)}
          >
            View Order Details
          </button>
          <button className="px-4 py-2 ml-4 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
            Continue Shopping
          </button>
          {open ? <OrderSummaryModal setOpen={setOpen} data={order} /> : null}
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
