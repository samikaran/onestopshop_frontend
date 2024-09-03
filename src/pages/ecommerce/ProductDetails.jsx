import { React, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";

import apiInstance from "../../utils/axios";
import GetCurrentAddress from "../../components/plugin/UserCountry";
import UserData from "../../components/plugin/UserData";
import CartID from "../../components/plugin/cartID";
import Ratings from "../../components/layouts/products/Ratings";
import styles from "../../assets/styles/styles";
import ProductTab from "../../components/layouts/products/ProductTab";
import { CartContext } from "../../components/plugin/Context";
import { addToCart } from "../../components/plugin/addToCart";
import { addToWishlist } from "../../components/plugin/addToWishlist";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [productImage, setProductImage] = useState("");
  const [gallery, setgallery] = useState([]);
  const [specifications, setSpecifications] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [vendor, setVendor] = useState([]);
  const [vendorUser, setVendorUser] = useState([]);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const [colorValue, setColorValue] = useState("No color selected");
  const [colorImage, setColorImage] = useState("image-url.jpg");
  const [sizeValue, setSizeValue] = useState("No Size");
  const [qtyValue, setQtyValue] = useState(1);

  const [cartData, setCartData] = useState({});
  const [totalCartItems, setTotalCartItems] = useState(0);

  let [isAddingToCart, setIsAddingToCart] = useState("Add To Cart");
  let [loading, setLoading] = useState(true);
  let [wishlistLoading, setWishlistLoading] = useState(false);
  let [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const [cartCount, setCartCount] = useContext(CartContext);

  const [createReview, setCreateReview] = useState({
    user_id: 0,
    product_id: product?.id,
    review: "",
    rating: 0,
  });
  const [reviews, setReviews] = useState([]);

  const axios = apiInstance;
  const params = useParams();
  // const addon = Addon();
  const currentAddress = GetCurrentAddress();
  const userData = UserData();
  let cart_id = CartID();

  // console.log(currentAddress);

  useEffect(() => {
    axios.get("products/" + params.slug + "/" + params.id).then((res) => {
      setProduct(res.data);
      setProductImage(res.data.image);
      setgallery(res.data.gallery);
      setSpecifications(res.data.specification);
      setColor(res.data.color);
      setSize(res.data.size);
      setVendor(res.data.vendor);
      setVendorUser(res.data.vendor.user);
      if (product) {
        setLoading(false);
      }
    });
  }, [loading]);

  // console.log(product);

  // ================== Adding Product to Cart ==================== //

  // Get color value after clicking on a button
  const handleColorButtonClick = (event) => {
    // Find the closest hidden input with class 'color_name' to the clicked button
    const colorNameInput = event.target
      .closest(".color_button")
      .parentNode.querySelector(".color_name");
    // const colorImageInput = event.target
    //   .closest(".color_button")
    //   .parentNode.querySelector(".color_image");

    if (colorNameInput) {
      const colorName = colorNameInput.value;
      // const colorImage = colorImageInput.value;
      setColorValue(colorName);
      // setProductImage(colorImage);
    }
  };

  const handleSizeSelect = (event) => {
    setSizeValue(event.target.value);
  };

  const incrementCount = () => {
    setQtyValue(qtyValue + 1);
  };
  const decrementCount = () => {
    if (qtyValue > 1) {
      setQtyValue(qtyValue - 1);
    }
  };

  // console.log(sizeValue);

  const handleAddToCart = async () => {
    // console.log(qtyValue);
    // console.log(colorValue);
    // console.log(sizeValue);
    // console.log(currentAddress.country)
    try {
      // Assuming addToCart is an async function
      await addToCart(
        product.id,
        userData?.user_id,
        qtyValue,
        product.price,
        product.shipping_amount,
        currentAddress.country,
        sizeValue,
        colorValue,
        cart_id,
        setIsAddingToCart
      );

      const url = userData?.user_id
        ? `cart-list/${cart_id}/${userData?.user_id}/`
        : `cart-list/${cart_id}/`;
      const response = await axios.get(url);

      setCartCount(response.data.length);
      console.log(response.data.length);
      // Swal.fire({
      //   icon: "success",
      //   title: "Added To Cart",
      // });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };


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
    // console.log(wishlist);
    if (wishlist && wishlist.find((i) => i.product.id === product.id)) {
      // console.log("I am here");
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  

  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="font-[roboto]">
            <div className="p-6 lg:max-w-7xl max-w-2xl max-lg:mx-auto">
              <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="w-full lg:sticky top-0 text-center">
                  <div className="lg:h-auto">
                    <img
                      src={productImage}
                      alt={{ productImage }}
                      className="lg:w-11/12 w-full h-full rounded-xl object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-wrap gap-x-8 gap-y-6 justify-center mx-auto mt-6">
                    <img
                      src={productImage}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                      alt="Gallery image 1"
                      className="w-20 cursor-pointer rounded-xl outline"
                    />
                    {gallery?.map((g, index) => (
                      <img
                        key={index}
                        src={g.image}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                        alt="Gallery image 1"
                        className="w-20 cursor-pointer rounded-xl"
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex flex-wrap items-start gap-4">
                    <div>
                      <h2 className="text-2xl font-extrabold text-gray-800">
                        {product.title}
                      </h2>
                      <p className="text-sm text-gray-400 mt-2">
                        {/* {product.vendor?.name} */}
                        {product.category?.title}
                      </p>
                      <p className="text-sm text-gray-400 mt-2 mb-2 flex flex-wrap">
                        <Ratings rating={product.rating} />
                        <span className="text-gray-600 ml-3">
                          {product.rating_count === 0
                            ? "No reviews yet"
                            : product.rating_count + " Reviews"}
                        </span>
                      </p>
                      <div className="flex flex-wrap">
                        <button
                          type="button"
                          className="px-2.5 py-1.5 bg-pink-100 text-xs text-pink-600 rounded-md flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12px"
                            fill="currentColor"
                            className="mr-1"
                            viewBox="0 0 64 64"
                          >
                            <path
                              d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                              data-original="#000000"
                            ></path>
                          </svg>
                          100
                        </button>
                        <button
                          type="button"
                          className="px-2.5 py-1.5 bg-gray-100 text-xs text-gray-800 rounded-md flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12px"
                            fill="currentColor"
                            viewBox="0 0 512 512"
                          >
                            <path
                              d="M453.332 85.332c0 38.293-31.039 69.336-69.332 69.336s-69.332-31.043-69.332-69.336C314.668 47.043 345.707 16 384 16s69.332 31.043 69.332 69.332zm0 0"
                              data-original="#000000"
                            />
                            <path
                              d="M384 170.668c-47.063 0-85.332-38.273-85.332-85.336C298.668 38.273 336.938 0 384 0s85.332 38.273 85.332 85.332c0 47.063-38.27 85.336-85.332 85.336zM384 32c-29.418 0-53.332 23.938-53.332 53.332 0 29.398 23.914 53.336 53.332 53.336s53.332-23.938 53.332-53.336C437.332 55.938 413.418 32 384 32zm69.332 394.668C453.332 464.957 422.293 496 384 496s-69.332-31.043-69.332-69.332c0-38.293 31.039-69.336 69.332-69.336s69.332 31.043 69.332 69.336zm0 0"
                              data-original="#000000"
                            />
                            <path
                              d="M384 512c-47.063 0-85.332-38.273-85.332-85.332 0-47.063 38.27-85.336 85.332-85.336s85.332 38.273 85.332 85.336c0 47.059-38.27 85.332-85.332 85.332zm0-138.668c-29.418 0-53.332 23.938-53.332 53.336C330.668 456.063 354.582 480 384 480s53.332-23.938 53.332-53.332c0-29.398-23.914-53.336-53.332-53.336zM154.668 256c0 38.293-31.043 69.332-69.336 69.332C47.043 325.332 16 294.293 16 256s31.043-69.332 69.332-69.332c38.293 0 69.336 31.039 69.336 69.332zm0 0"
                              data-original="#000000"
                            />
                            <path
                              d="M85.332 341.332C38.273 341.332 0 303.062 0 256s38.273-85.332 85.332-85.332c47.063 0 85.336 38.27 85.336 85.332s-38.273 85.332-85.336 85.332zm0-138.664C55.914 202.668 32 226.602 32 256s23.914 53.332 53.332 53.332c29.422 0 53.336-23.934 53.336-53.332s-23.914-53.332-53.336-53.332zm0 0"
                              data-original="#000000"
                            />
                            <path
                              d="M135.703 245.762c-7.426 0-14.637-3.864-18.562-10.774-5.825-10.218-2.239-23.254 7.98-29.101l197.95-112.852c10.218-5.867 23.253-2.281 29.1 7.977 5.825 10.218 2.24 23.254-7.98 29.101L146.238 242.965a21.195 21.195 0 0 1-10.535 2.797zm197.93 176c-3.586 0-7.211-.899-10.54-2.797L125.142 306.113c-10.22-5.824-13.801-18.86-7.977-29.101 5.8-10.239 18.856-13.844 29.098-7.977l197.953 112.852c10.219 5.824 13.8 18.86 7.976 29.101-3.945 6.91-11.156 10.774-18.558 10.774zm0 0"
                              data-original="#000000"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div className="flex flex-wrap gap-4 items-start">
                    <div className="py-2 flex items-center justify-between">
                      <div className="flex">
                        <h5
                          className={`${styles.productDiscountPrice} text-4xl`}
                        >
                          {product.old_price === 0
                            ? "$" + product.old_price
                            : "$" + product.price}
                        </h5>
                        <h4 className={`${styles.price}`}>
                          {product.old_price ? "$" + product.old_price : null}
                        </h4>
                      </div>
                    </div>
                    <div>
                      <span className="font-[400] text-[17px] text-[#74bf44]">
                        Available
                      </span>
                    </div>
                  </div>
                  <hr className="my-4" />
                  {size?.length > 0 ? (
                    <div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          Select a Size
                        </h3>

                        <div className="flex flex-wrap gap-4 mt-2">
                          <div className="relative w-72 max-w-full  mt-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-400 right-3"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <select
                              className="w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
                              onClick={handleSizeSelect}
                            >
                              <option value={"Not Selected"}>
                                Select Size
                              </option>
                              {size?.map((s, index) => (
                                <option key={index} value={s.name}>
                                  {s.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <hr className="my-4" />
                    </div>
                  ) : (
                    // Render empty div
                    <div></div>
                  )}
                  {/* Colors */}
                  {color?.length > 0 ? (
                    <div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          Choose a Color
                        </h3>

                        <div className="flex flex-wrap gap-4 mt-4">
                          {color?.map((c, index) => (
                            <div key={index}>
                              <input
                                type="hidden"
                                className="color_name"
                                value={c.name}
                              />
                              <input
                                type="hidden"
                                className="color_image"
                                value={c.image}
                              />
                              <button
                                className="w-10 h-10 color_button border-2 border-white hover:border-gray-800 rounded-full shrink-0"
                                onClick={handleColorButtonClick}
                                style={{ backgroundColor: `${c.color_code}` }}
                              ></button>
                            </div>
                          ))}
                          <p className="my-2 mx-2">{colorValue}</p>
                        </div>
                      </div>
                      <hr className="my-4" />
                    </div>
                  ) : (
                    // Render empty div
                    <div></div>
                  )}
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center justify-between pr-3">
                      <div>
                        <button
                          className="bg-gradient-to-r from-[#e09967] to-[#f88330] text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                          onClick={decrementCount}
                        >
                          -
                        </button>
                        <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                          {qtyValue}
                        </span>
                        <button
                          className="bg-gradient-to-r from-[#e09967] to-[#f88330] text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                          onClick={incrementCount}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="min-w-[200px] px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-bold rounded"
                      onClick={handleAddToCart}
                    >
                      Add to cart
                    </button>
                    <div className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                      {click ? (
                        <AiFillHeart
                          size={30}
                          className="cursor-pointer"
                          onClick={() => removeFromWishlistHandler(product.id)}
                          color={click ? "red" : "#333"}
                          title="Remove from wishlist"
                        />
                      ) : (
                        <AiOutlineHeart
                          size={30}
                          className="cursor-pointer"
                          onClick={() => addToWishlistHandler(product.id)}
                          color={click ? "red" : "#333"}
                          title="Add to wishlist"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-24 max-w-4xl">
                <ProductTab
                  product={product}
                  specifications={specifications}
                  seller={vendor}
                  reviews={reviews}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
