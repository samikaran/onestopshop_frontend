import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiInstance from "../../utils/axios";
import moment from "moment";
import { FaPrint } from "react-icons/fa";

const Invoice = () => {
  const [order, setOrder] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const axios = apiInstance;
  const param = useParams();

  useEffect(() => {
    axios.get(`checkout/${param?.order_oid}/`).then((res) => {
      setOrder(res.data);
      setOrderItems(res.data.orderitem);
    });
  }, [param]);

  console.log(order);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div
        className="max-w-3xl mx-auto p-6 bg-white rounded shadow-sm my-6"
        id="invoice"
      >
        <div className="grid grid-cols-2 items-center">
          <div>
            <img src="/logo.png" alt="company-logo" height="100" width="100" />
          </div>

          <div className="text-right">
            <p>OneStopShop</p>
            <p className="text-gray-500 text-sm">support@onestopshop.com</p>
            <p className="text-gray-500 text-sm mt-1">+1 (289) 937-9954</p>
            {/* <p className="text-gray-500 text-sm mt-1">VAT: 8657671212</p> */}
          </div>
        </div>
        <div className="grid grid-cols-2 items-center mt-8">
          <div>
            <p className="font-bold text-gray-800">Bill to :</p>
            <p className="text-gray-500">
              {order.full_name}
              <br />
              {order.address}, {order.city}, {order.state}, {order.zip},{" "}
              {order.country}
            </p>
            <p className="text-gray-500">{order.email}</p>
          </div>

          <div className="text-right">
            <p className="">
              Invoice number:
              <span className="text-gray-500"> {order.oid}</span>
            </p>
            <p>
              Invoice date:{" "}
              <span className="text-gray-500">
                {moment(order.date).format("MMM D, YYYY")}
              </span>
              <br />
              {/* Due date:<span className="text-gray-500">31/07/2023</span> */}
            </p>
          </div>
        </div>

        <div className="-mx-4 mt-8 flow-root sm:mx-0">
          <table className="min-w-full">
            <thead className="border-b border-gray-300 text-gray-900">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Product
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Discount
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0"
                >
                  Sub Total
                </th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((order, index) => (
                <tr className="border-b border-gray-200">
                  <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                    <div className="font-medium text-gray-900">
                      {order?.product?.title}
                    </div>
                    {/* <div className="mt-1 truncate text-gray-500">
                      {order?.product?.category?.title}
                    </div> */}
                  </td>
                  <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                    {order?.qty}
                  </td>
                  <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                    ${order?.price}
                  </td>
                  <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                    ${order?.saved}
                  </td>
                  <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">
                    ${order?.sub_total}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th
                  scope="row"
                  colspan="4"
                  className="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                >
                  Subtotal
                </th>
                <th
                  scope="row"
                  className="pl-6 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden"
                >
                  Subtotal
                </th>
                <td className="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">
                  ${order.sub_total}
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  colspan="4"
                  className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                >
                  Shipping
                </th>
                <th
                  scope="row"
                  className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden"
                >
                  Shipping
                </th>
                <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">
                  ${order.shipping_amount}
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  colspan="4"
                  className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                >
                  Tax
                </th>
                <th
                  scope="row"
                  className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden"
                >
                  Tax
                </th>
                <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">
                  ${order.tax_fee}
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  colspan="4"
                  className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                >
                  Service Fee
                </th>
                <th
                  scope="row"
                  className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden"
                >
                  Service Fee
                </th>
                <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">
                  ${order.service_fee}
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  colspan="4"
                  className="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0"
                >
                  Total
                </th>
                <th
                  scope="row"
                  className="pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden"
                >
                  Total
                </th>
                <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">
                  ${order.total}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="border-t-2 pt-4 text-xs text-gray-500 text-center mt-16">
          <button onClick={handlePrint} id="printButton" className="font-bold">
            Print 
            {/* <FaPrint /> */}
          </button>
        </div>
      </div>
    </>
  );
};

export default Invoice;
