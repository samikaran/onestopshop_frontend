import React, { useEffect, useState, useContext } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import GetCurrentAddress from "../../plugin/UserCountry";
import UserData from "../../plugin/UserData";
import CartID from "../../plugin/cartID";
import styles from "../../../assets/styles/styles";
import apiInstance from "../../../utils/axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { CartContext } from "../../plugin/Context";
import { addToCart } from "../../plugin/addToCart";
import { addToWishlist } from "../../plugin/addToWishlist";

const ProductQuickView = ({ setOpen, data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [specifications, setSpecifications] = useState(data?.specification);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [cartCount, setCartCount] = useContext(CartContext);
  const [wishlist, setWishlist] = useState([]);

  let [isAddingToCart, setIsAddingToCart] = useState("Add To Cart");
  const [loadingStates, setLoadingStates] = useState({});

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [colorValue, setColorValue] = useState("No color selected");
  const [colorImage, setColorImage] = useState("image-url.jpg");
  const [sizeValue, setSizeValue] = useState("No Size");
  const [qtyValue, setQtyValue] = useState(1);

  const currentAddress = GetCurrentAddress();
  const userData = UserData();
  let cart_id = CartID();
  const axios = apiInstance;

  const decrementCount = () => {
    if (qtyValue > 1) {
      setQtyValue(qtyValue - 1);
    }
  };

  const incrementCount = () => {
    setQtyValue(qtyValue + 1);
  };

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

  // console.log(data.specification);

  useEffect(() => {
    setSpecifications(data.specification);
    setColor(data.color);
    setSize(data.size);
  }, []);

  // console.log(specifications);

  const handleQtyChange = (e, product_id) => {
    setQtyValue(e.target.value);
    setSelectedProduct(product_id);
  };

  // const handleAddToCart = async (product_id, price, shipping_amount) => {
  //   const formdata = new FormData();

  //   formdata.append("product_id", product_id);
  //   formdata.append("user_id", userData?.user_id);
  //   formdata.append("qty", qtyValue);
  //   formdata.append("price", price);
  //   formdata.append("shipping_amount", shipping_amount);
  //   formdata.append("country", currentAddress.country);
  //   formdata.append("size", sizeValue);
  //   formdata.append("color", colorValue);
  //   formdata.append("cart_id", cart_id);

  //   // temp fields
  //   formdata.append("product", product_id);
  //   formdata.append("user", userData?.user_id);

  //   const response = await apiInstance.post(`cart-view/`, formdata);
  //   console.log(response.data);

  //   toast.success(response.data.message);

  //   // Swal.fire({
  //   //   icon: "success",
  //   //   title: response.data.message,
  //   // });
  // };

  const handleAddToCart = async (product_id, price, shipping_amount) => {
    setLoadingStates((prevStates) => ({
      ...prevStates,
      [product_id]: "Adding...",
    }));

    try {
      await addToCart(
        product_id,
        userData?.user_id,
        qtyValue,
        price,
        shipping_amount,
        currentAddress.country,
        colorValue,
        sizeValue,
        cart_id,
        setIsAddingToCart
      );

      // After a successful operation, set the loading state to false
      setLoadingStates((prevStates) => ({
        ...prevStates,
        [product_id]: "Added to Cart",
      }));

      setColorValue("No Color");
      setSizeValue("No Size");
      setQtyValue(0);

      const url = userData?.user_id
        ? `cart-list/${cart_id}/${userData?.user_id}/`
        : `cart-list/${cart_id}/`;
      const response = await axios.get(url);

      setCartCount(response.data.length);
      console.log(response.data.length);
    } catch (error) {
      console.log(error);

      // In case of an error, set the loading state for the specific product back to "Add to Cart"
      setLoadingStates((prevStates) => ({
        ...prevStates,
        [product_id]: "Add to Cart",
      }));
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
      <div className="bg-[#fff]">
        {data ? (
          <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
            <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
              <RxCross1
                size={30}
                className="absolute right-3 top-3 z-50"
                onClick={() => setOpen(false)}
              />
              <div className="block w-full 800px:flex">
                <div className="w-full 800px:w-[50%]">
                  <img src={`${data.image}`} alt="" />
                </div>
                <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                  <h1 className={`${styles.productTitle} text-[20px]`}>
                    {data.title}
                  </h1>
                  <p>{data.description}</p>

                  <div className="flex pt-3">
                    <h4 className={`${styles.productDiscountPrice}`}>
                      {data.price}$
                    </h4>
                    <h3 className={`${styles.price}`}>
                      {data.old_price ? data.old_price + "$" : null}
                    </h3>
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
                      onClick={() =>
                        handleAddToCart(
                          data.id,
                          data.price,
                          data.shipping_amount
                        )
                      }
                      disabled={loadingStates[data.id] === "Adding..."}
                    >
                      {loadingStates[data.id] === "Added to Cart" ? (
                        <>
                          Added to Cart
                          {/* <FaCheckCircle /> */}
                        </>
                      ) : loadingStates[data.id] === "Adding..." ? (
                        <>
                          Adding to Cart
                          {/* <FaSpinner className="fas fa-spin" /> */}
                        </>
                      ) : (
                        <>
                          {loadingStates[data.id] || "Add to Cart"}{" "}
                          {/* <FaShoppingCart /> */}
                        </>
                      )}
                    </button>
                    <div className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                      {click ? (
                        <AiFillHeart
                          size={30}
                          className="cursor-pointer"
                          onClick={() => removeFromWishlistHandler(data.id)}
                          color={click ? "red" : "#333"}
                          title="Remove from wishlist"
                        />
                      ) : (
                        <AiOutlineHeart
                          size={30}
                          className="cursor-pointer"
                          onClick={() => addToWishlistHandler(data.id)}
                          color={click ? "red" : "#333"}
                          title="Add to wishlist"
                        />
                      )}
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

export default ProductQuickView;
