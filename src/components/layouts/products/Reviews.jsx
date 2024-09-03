import { React, useState, useEffect } from "react";
import Ratings from "./Ratings";
import moment from "moment";
import apiInstance from "../../../utils/axios";
import { useParams } from "react-router-dom";
import UserData from "../../plugin/UserData";
import Swal from "sweetalert2";

const Reviews = ({ product }) => {
  let [loading, setLoading] = useState(true);
  const [createReview, setCreateReview] = useState({
    user_id: 0,
    product_id: product?.id,
    review: "",
    rating: 0,
  });
  const [reviews, setReviews] = useState([]);
  //   console.log(reviews);

  const axios = apiInstance;
  const params = useParams();
  const userData = UserData();
  //   console.log(userData);

  const handleReviewChange = (event) => {
    setCreateReview({
      ...createReview,
      [event.target.name]: event.target.value,
    });
    // console.log(createReview);
  };

  const fetchReviewData = async () => {
    // console.log(product.id);
    // console.log(params.id);
    if (product !== null) {
      axios.get(`reviews/${product?.id}/`).then((res) => {
        setReviews(res.data);
      });
    }
  };

  // console.log(reviews);

  useEffect(() => {
    fetchReviewData();
  }, [loading]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();

    formdata.append("user_id", userData?.user_id);
    formdata.append("product_id", product?.id);
    formdata.append("rating", createReview.rating);
    formdata.append("review", createReview.review);

    axios.post(`create-review/`, formdata).then((res) => {
      fetchReviewData();
      Swal.fire({
        icon: "success",
        title: "Review created successfully",
      });
    });
  };

  return (
    <>
      <div className="mt-2">
        <div className="flex flex-col ">
          <div className="flex-grow overflow-y-auto p-4">
            {reviews.length > 0 ? (
              <>
                {reviews?.map((review, index) => (
                  <ReviewCard key={index} {...review} />
                ))}
              </>
            ) : (
              <h2>No Reviews Yet!</h2>
            )}
          </div>
          {/* <WriteReviewForm /> */}
          <div className="mt-10">
            <h3 className="text-lg font-bold text-gray-800">
              Write a review
            </h3>
          </div>
          <form
            className="flex flex-col space-y-2 mt-4"
            method="POST"
            onSubmit={handleReviewSubmit}
          >
            {/* <Rating /> */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Rating
              </label>
              <select
                onChange={handleReviewChange}
                name="rating"
                className="text-[#f6b100]"
                id=""
              >
                <option value="1" className="">
                  ★
                </option>
                <option value="2" className="">
                  ★★
                </option>
                <option value="3" className="">
                  ★★★
                </option>
                <option value="4" className="">
                  ★★★★
                </option>
                <option value="5" className="" selected>
                  ★★★★★
                </option>
              </select>
            </div>
            <textarea
              rows={4}
              className="p-2 border border-gray-200 rounded-md"
              placeholder="Write your review..."
              onChange={handleReviewChange}
              name="review"
              value={createReview.review}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

function ReviewCard(review) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-2">
      <div className="flex items-center mb-2">
        {/* Display reviewer information (name/avatar) */}
        <img src={review.profile.image} className="w-8 h-8 rounded" />
        <div className="ml-2">
          <p className="text-gray-700 font-medium ">
            {review.profile.full_name}
          </p>
          <small className="text-xs">
            {moment(review.date).format("MMM D, YYYY")}
          </small>
        </div>
      </div>
      <Ratings rating={review.rating} />
      <p className="text-gray-700">{review.review}</p>
    </div>
  );
}

function WriteReviewForm() {
  // Handle form submission logic here
  return (
    <form className="flex flex-col space-y-2 mt-10">
      {/* <Rating /> */}
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Rating
        </label>
        <select
          //   onChange={handleReviewChange}
          name="rating"
          className="text-[#f6b100]"
          id=""
        >
          <option value="1" className="">
            ★
          </option>
          <option value="2" className="">
            ★★
          </option>
          <option value="3" className="">
            ★★★
          </option>
          <option value="4" className="">
            ★★★★
          </option>
          <option value="5" className="" selected>
            ★★★★★
          </option>
        </select>
      </div>
      <textarea
        rows={4}
        className="p-2 border border-gray-200 rounded-md"
        placeholder="Write your review..."
        // onChange={handleReviewChange}
        value={createReview.review}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Submit Review
      </button>
    </form>
  );
}

export default Reviews;
