import React from "react";
import { RxCross1 } from "react-icons/rx";

const OrderSummaryModal = ({ setOpen, data }) => {
  return (
    <>
      <div className="bg-[#fff]">
        {data ? (
          <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
            <div className="w-[90%] 800px:w-[40%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
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
                      <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                        Order Summary
                      </h1>
                      <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
                        Order ID: #{data.oid}
                      </p>
                    </div>
                    <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                      <div className="flex flex-col justify-start items-start flex-shrink-0">
                        <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                          {/* <img
                            src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                            alt="avatar"
                          /> */}
                          <div className="flex justify-start items-start flex-col space-y-2">
                            <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                              {data.full_name}
                            </p>
                            {/* <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">
                              10 Previous Orders
                            </p> */}
                          </div>
                        </div>

                        <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                          <img
                            className="dark:hidden"
                            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1.svg"
                            alt="email"
                          />
                          <img
                            className="hidden dark:block"
                            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1dark.svg"
                            alt="email"
                          />
                          <p className="cursor-pointer text-sm leading-5 ">
                            {data.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                        <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                          <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                            <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                              Shipping Address
                            </p>
                            <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                              {data.address}, {data.city}, {data.state},{" "}
                              {data.zip},{data.country}
                            </p>
                          </div>
                          <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                            Summary
                          </h3>
                            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                              {/* Productlist */}
                              {data.orderitem?.map((o, index) => (
                                <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200" key={index}>
                                  <img
                                    className="w-24 h-auto rounded"
                                    src={o.product?.image}
                                    alt="avatar"
                                  />
                                  <div className="flex justify-start items-start flex-col space-y-2">
                                    <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                                      {o.product?.title}
                                    </p>
                                    <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">
                                      ${o.price}
                                    </p>
                                  </div>
                                </div>
                              ))}

                              {/* Productlist */}
                              <div className="flex justify-between w-full">
                                <p className="text-base dark:text-white leading-4 text-gray-800">
                                  Subtotal
                                </p>
                                <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                                  ${data.sub_total}
                                </p>
                              </div>

                              <div className="flex justify-between items-center w-full">
                                <p className="text-base dark:text-white leading-4 text-gray-800">
                                  Shipping Fee
                                </p>
                                <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                                  ${data.shipping_amount}
                                </p>
                              </div>
                              <div className="flex justify-between items-center w-full">
                                <p className="text-base dark:text-white leading-4 text-gray-800">
                                  Service Fee
                                </p>
                                <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                                  ${data.service_fee}
                                </p>
                              </div>
                              <div className="flex justify-between items-center w-full">
                                <p className="text-base dark:text-white leading-4 text-gray-800">
                                  Tax
                                </p>
                                <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                                  ${data.tax_fee}
                                </p>
                              </div>
                              <div className="flex justify-between items-center w-full">
                                <p className="text-base dark:text-white leading-4 text-gray-800">
                                  Discount{" "}
                                  {/* <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">
                                    STUDENT
                                  </span> */}
                                </p>
                                <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                                  -${data.saved}
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between items-center w-full">
                              <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                                Total
                              </p>
                              <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                                ${data.total}
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                          <button className="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800">
                            Edit Details
                          </button>
                        </div> */}
                      </div>
                    </div>
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

export default OrderSummaryModal;
