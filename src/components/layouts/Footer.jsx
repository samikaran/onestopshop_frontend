import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TestingAlert from "./TestingAlert";

const Footer = () => {
  return (
    <>
      <footer className="bg-white dark:bg-neutral-700 dark:text-white">
        <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>
              <div className="flex justify-center text-teal-600 sm:justify-start">
                <img src="/favicon.png" alt="icon" />
              </div>

              <p className="mt-6 max-w-md text-center leading-relaxed  sm:max-w-xs sm:text-left">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Incidunt consequuntur amet culpa cum itaque neque.
              </p>

              <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-teal-700 transition hover:text-teal-700/75"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-teal-700 transition hover:text-teal-700/75"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-teal-700 transition hover:text-teal-700/75"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2">
              <div className="text-center sm:text-left">
                <p className="text-lg font-medium text-gray-900">OneStopShop</p>

                <ul className="mt-8 space-y-4 text-sm">
                  <li>
                    <a
                      className="text-black-700 transition hover:text-gray-700/75"
                      href="#"
                    >
                      About OneStopShop
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-black-700 transition hover:text-gray-700/75"
                      href="#"
                    >
                      OneStopShop Blog
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-black-700 transition hover:text-gray-700/75"
                      href="#"
                    >
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-black-700 transition hover:text-gray-700/75"
                      href="#"
                    >
                      Privacy Policy
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-black-700 transition hover:text-gray-700/75"
                      href="#"
                    >
                      {" "}
                      Careers{" "}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="text-center sm:text-left">
                <p className="text-lg font-medium text-gray-900">
                  Customer Care
                </p>

                <ul className="mt-8 space-y-4 text-sm">
                  <li>
                    <Link
                      to="/faqs"
                      className="text-black-700 transition hover:text-gray-700/75"
                    >
                      FAQs
                    </Link>
                  </li>

                  <li>
                    <a
                      className="text-black-700 transition hover:text-gray-700/75"
                      href="#"
                    >
                      {" "}
                      How to buy{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-black-700 transition hover:text-gray-700/75"
                      href="#"
                    >
                      {" "}
                      Returns & Refunds{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-black-700 transition hover:text-gray-700/75"
                      href="#"
                    >
                      {" "}
                      Seller Help Center{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      className="group flex justify-start gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                      href="#"
                    >
                      <span className="text-black-700 transition group-hover:text-gray-700/75">
                        Live Help Center
                      </span>

                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-teal-500"></span>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="text-center sm:text-left">
                <p className="text-lg font-medium text-gray-900">Contact Us</p>

                <ul className="mt-8 space-y-4 text-sm">
                  <li>
                    <a
                      className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                      href="#"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5 shrink-0 text-gray-900"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>

                      <span className="flex-1 text-black-700">
                        support@onestopshop.com
                      </span>
                    </a>
                  </li>

                  <li>
                    <a
                      className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                      href="#"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5 shrink-0 text-gray-900"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>

                      <span className="flex-1 text-black-700">0123456789</span>
                    </a>
                  </li>

                  <li className="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 shrink-0 text-gray-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>

                    <address className="-mt-0.5 flex-1 not-italic text-black-700">
                      Scarborough, ON, M1L 0G9
                    </address>
                  </li>
                </ul>

                <p className="text-lg font-medium text-gray-900 mt-10">
                  Payment Methods
                </p>
                <div className="sm:block flex items-center justify-center w-full mt-5">
                  <img
                    src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <footer className="flex flex-col items-center bg-zinc-50 text-center text-surface dark:bg-neutral-700 dark:text-white lg:text-left mt-10">
            <div className="container ">
              <div className="grid gap-4 lg:grid-cols-1">
                <div className="mb-6 md:mb-0">
                  <h5 className="mb-2 font-medium uppercase">
                    POPULAR CATEGORIES
                  </h5>

                  <p className="mb-4">
                    Bakery Industry, Biscuits Industry, Brewery And Distillery,
                    Confectionery Ingredients, Cosmetics Ingredients, Dairy and
                    ice cream Ingredients, Departmental Stores, Edible Oil &
                    Refinery, Feed Industry, Flour Mil-Winning Foods, Food &
                    Beverage Industry, Hotel, QSR, Bar & Cafe, Meat & Sausage
                    Ingredients, Mustard Oil & Soya Nugget, Noodle & Snacks
                    Ingredients, Pharmaceuticals Ingredients, Rice & Dal
                    Ingredients, Snacks & Namkeen, Soap & Detergent Chemicals,
                    Spice Manufacturer, Whole Sale, Semi-Whole Sale, Wine
                    Industry,
                  </p>
                </div>

                <div className="mb-6 md:mb-0">
                  <h5 className="mb-2 font-medium uppercase">
                    POPULAR PRODUCTS
                  </h5>

                  <p className="mb-4">
                    Bakery Industry & HORECA, Biscuit Industry, Brewery &
                    Distillery, Confectionery Industry, Cosmetic Industry, Dairy
                    & Ice-Cream Industry, Departmental Store, Edible Oil &
                    Refinery, Feed Industry, Flour Mill-Winning Foods Industry,
                    Food & Beverage Industry, Invert Syrup for Bakery,
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full bg-black/5 p-4 text-center">
              <div className="">
                <div className="text-center sm:flex sm:justify-between sm:text-left">
                  <p className="text-sm ">
                    <span className="block sm:inline">
                      All rights reserved.
                    </span>

                    <a
                      className="inline-block text-teal-600 underline transition hover:text-teal-600/75"
                      href="#"
                    >
                      Terms & Conditions
                    </a>

                    <span>&middot;</span>

                    <a
                      className="inline-block text-teal-600 underline transition hover:text-teal-600/75"
                      href="#"
                    >
                      Privacy Policy
                    </a>
                  </p>

                  <p className="mt-4 text-sm sm:order-first sm:mt-0">
                    &copy; 2024 MSS Group
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </footer>

      <TestingAlert />
    </>
  );
};

export default Footer;
