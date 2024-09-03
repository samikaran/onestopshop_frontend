import React, { useState, useEffect } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { LiaCartPlusSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import styles from "../../../assets/styles/styles";
import Ratings from "./Ratings";
import ProductQuickView from "./ProductQuickView";
import { addToWishlist } from "../../plugin/addToWishlist";
import UserData from "../../plugin/UserData";
import apiInstance from "../../../utils/axios";

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  //   const dispatch = useDispatch();
  const [wishlist, setWishlist] = useState([]);

  const removeFromWishlistHandler = (pid) => {
    handleAddToWishlist(pid);
    setClick(!click);
    // dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (pid) => {
    handleAddToWishlist(pid);
    setClick(!click);
    // dispatch(addToWishlist(data));
  };

  const userData = UserData();
  const axios = apiInstance;

  const product_id = data.id;
  const product_slug = data.slug;
  // const product_name = d.replace(/\s+/g, "-");

  // console.log(product_id);
  // console.log(userData?.user_id);

  const handleAddToWishlist = async (id) => {
    try {
      await addToWishlist(id, userData?.user_id);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(
        `customer/wishlist/${userData?.user_id}/`
      );
      setWishlist(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [userData?.user_id]);

  useEffect(() => {
    console.log(wishlist);
    if (wishlist && wishlist.find((i) => i.product.id === data.id)) {
      // console.log("I am here");
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/product/${product_slug}/${product_id}`}>
          <img
            src={data.image}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link to={`/product/${product_slug}/${product_id}`}>
          <h4 className="pb-3 font-[500]" title={data.title}>
            {data.title.length > 40
              ? data.title.slice(0, 40) + "..."
              : data.title}
          </h4>
          <div className="flex">
            <Ratings rating={data?.product_rating} />
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.old_price === 0 ? data.old_price : data.price}
              </h5>
              <h4 className={`${styles.price}`}>
                {data.old_price ? data.old_price + " $" : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#74bf44]">
              {data?.total_sell} sold
            </span>
          </div>
        </Link>

        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishlistHandler(product_id)}
              // onClick={() => setClick(!click)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishlistHandler(product_id)}
              // onClick={() => setClick(!click)}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <LiaCartPlusSolid
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => setOpen(!open)}
            // onClick={() => addToCartHandler(data._id)}
            color="#444"
            title="Add to cart"
          />
          {/* {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null} */}
          {open ? <ProductQuickView setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
