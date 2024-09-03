import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import apiInstance from "../../utils/axios";
import UserData from "../../components/plugin/UserData";
import Sidebar from "./Sidebar";
import Breadcrumb from "./Breadcrumb";
import Ratings from "../../components/layouts/products/Ratings";
import { BsEye } from "react-icons/bs";
import { FiSend } from "react-icons/fi";

const ReviewDetail = () => {
  const [review, setReview] = useState([]);
  const [updateReviews, setUpdateReviews] = useState({ reply: "" });

  if (UserData()?.vendor_id === 0) {
    window.location.href = "/vendor/register/";
  }

  const axios = apiInstance;
  const userData = UserData();
  const params = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `vendor-reviews/${userData?.vendor_id}/${params.id}`
      );
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReplyChange = (event) => {
    setUpdateReviews({
      ...updateReviews,
      [event.target.name]: event.target.value,
    });
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("reply", updateReviews.reply);

    await axios
      .patch(`vendor-reviews/${userData?.vendor_id}/${review.id}/`, formdata)
      .then((res) => {
        console.log(res.data);
        fetchData();
        updateReviews.reply = "";
      });
  };

  console.log(review);

  return (
    <>
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-1 lg:py-12">
              <Sidebar route="reviews" />
            </div>
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-4 lg:p-12">
              {/* <Breadcrumb title="Reviews and Rating" /> */}

              {/* Contents Here */}

              <div className="flex items-start mt-10">
                <div className="flex-shrink-0">
                  <div className="inline-block relative">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <img
                        className="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover"
                        src={review.profile?.image}
                        alt="Profile picture"
                      />
                      <div className="absolute top-0 left-0 w-full h-full rounded-full shadow-inner"></div>
                    </div>
                    {/* <svg
                        className="fill-current text-white bg-green-600 rounded-full p-1 absolute bottom-0 right-0 w-6 h-6 -mx-1 -my-1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M19 11a7.5 7.5 0 0 1-3.5 5.94L10 20l-5.5-3.06A7.5 7.5 0 0 1 1 11V3c3.38 0 6.5-1.12 9-3 2.5 1.89 5.62 3 9 3v8zm-9 1.08l2.92 2.04-1.03-3.41 2.84-2.15-3.56-.08L10 5.12 8.83 8.48l-3.56.08L8.1 10.7l-1.03 3.4L10 12.09z" />
                      </svg> */}
                  </div>
                </div>
                <div className="ml-6">
                  <p className="flex items-baseline">
                    <span className="text-gray-600 font-bold">
                      {review?.profile?.full_name}
                    </span>
                    <span className="ml-2 text-green-600 text-xs">
                      Verified Buyer
                    </span>
                  </p>
                  <div className="flex items-center mt-1">
                    <Ratings rating={review.rating} />
                  </div>
                  <div className="mt-3">
                    <p className="mt-1 mb-3">
                      <b>Product:</b> {review?.product?.title}
                    </p>
                    <b>Review: </b>
                    <span className=" mt-5">{review.review}</span>
                    <p className="text-dark mb-2 d-flex">
                      <b>Reply: {""} </b>
                      {review.reply === null ? (
                        <span className="ms-2"> No reply yet</span>
                      ) : (
                        <span className="ms-2"> {review?.reply}</span>
                      )}
                    </p>
                  </div>
                  <form onSubmit={handleReplySubmit} method="POST">
                    <div className="flex px-4 py-3 rounded-md border-2 border-blue-500 overflow-hidden max-w-md  font-[sans-serif] mt-5">
                      <input
                        type="text"
                        placeholder="Write your reply..."
                        className="w-full outline-none bg-transparent text-gray-600 text-sm"
                        onChange={handleReplyChange}
                        name="reply"
                      />

                      <button type="submit">
                        <FiSend className="" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReviewDetail;
