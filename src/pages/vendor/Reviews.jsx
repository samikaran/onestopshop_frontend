import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import apiInstance from "../../utils/axios";
import UserData from "../../components/plugin/UserData";
import Sidebar from "./Sidebar";
import Breadcrumb from "./Breadcrumb";
import Ratings from "../../components/layouts/products/Ratings";
import { BsEye, BsReply } from "react-icons/bs";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [updateReviews, setUpdateReviews] = useState({ reply: "" });

  const axios = apiInstance;
  const userData = UserData();

  if (UserData()?.vendor_id === 0) {
    window.location.href = "/vendor/register/";
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `vendor-reviews/${userData?.vendor_id}/`
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReplyChange = (event) => {
    console.log(updateReviews.reply);
    setUpdateReviews({
      ...updateReviews,
      [event.target.name]: event.target.value,
    });
  };

  const handleReplySubmit = async (reviewId) => {
    reviewId.preventDefault();
    const formdata = new FormData();

    formdata.append("reply", updateReviews.reply);

    await axios
      .patch(`vendor-reviews/${userData?.vendor_id}/${reviewId}`, formdata)
      .then((res) => {
        console.log(res.data);
      });
  };

  console.log(updateReviews);

  return (
    <>
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-1 lg:py-12">
              <Sidebar route="reviews" />
            </div>
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-4 lg:p-12">
              <Breadcrumb title="Reviews and Rating" />

              {/* Contents Here */}
              {reviews.map((review, index) => (
                <div className="flex items-start mt-10" key={index}>
                  <div className="flex-shrink-0">
                    <div className="inline-block relative">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <img
                          className="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover"
                          src={review.profile.image}
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
                      <span className="text-gray-600 font-bold">{review.profile.full_name}</span>
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
                      <span className="font-bold mt-5">{review.review}</span>
                      <p className="text-dark mb-2 d-flex">
                      <b>Reply: {""} </b>
                      {review.reply === null ? (
                        <span className="ms-2"> No reply yet</span>
                      ) : (
                        <span className="ms-2"> {review?.reply}</span>
                      )}
                    </p>
                    </div>
                    <div className="flex items-center justify-between mt-4 text-sm text-gray-600 fill-current">
                      <button className="flex items-center"></button>
                      <div className="flex items-center">
                        <BsReply />
                        <span className="ml-2">
                          <Link to={`/vendor/reviews/${review.id}/`}>Reply</Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {reviews < 1 && <h5 className="mt-4">No reviews yet</h5>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reviews;
