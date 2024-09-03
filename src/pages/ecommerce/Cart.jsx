import { React, useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { AiOutlineReload } from "react-icons/ai";
import { FaLongArrowAltRight } from "react-icons/fa";
// import TextField from "@mui/material/TextField";

import { addToCart } from "../../components/plugin/addToCart";
import apiInstance from "../../utils/axios";
import GetCurrentAddress from "../../components/plugin/UserCountry";
import UserData from "../../components/plugin/UserData";
import CartID from "../../components/plugin/cartID";
import { CartContext } from "../../components/plugin/Context";

const Cart = () => {
  const [cart, setCart] = useState([]); // Initial value
  const [cartTotal, setCartTotal] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});
  let [isAddingToCart, setIsAddingToCart] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [cartCount, setCartCount] = useContext(CartContext);

  const axios = apiInstance;
  const userData = UserData();
  let cart_id = CartID();
  const currentAddress = GetCurrentAddress();
  let navigate = useNavigate();

  // Get cart Items
  const fetchCartData = (cartId, userId) => {
    const url = userId
      ? `cart-list/${cartId}/${userId}/`
      : `cart-list/${cartId}/`;

    // console.log(url);

    axios.get(url).then((res) => {
      setCart(res.data);
      // setCartCount(res.data.length);
    });
  };

  console.log(cart);

  // Get Cart Totals
  const fetchCartTotal = async (cartId, userId) => {
    const url = userId
      ? `cart-detail/${cartId}/${userId}/`
      : `cart-detail/${cartId}/`;
    axios.get(url).then((res) => {
      setCartTotal(res.data);
    });
    // console.log(cartTotal);
  };

  if (cart_id !== null || cart_id !== undefined) {
    if (userData !== undefined) {
      useEffect(() => {
        fetchCartData(cart_id, userData.user_id);
        fetchCartTotal(cart_id, userData.user_id);
      }, []);
    } else {
      useEffect(() => {
        fetchCartData(cart_id, null);
        fetchCartTotal(cart_id, null);
      }, []);
    }
  } else {
    window.location.href("/");
  }

  useEffect(() => {
    const initialQuantities = {};
    cart.forEach((c) => {
      initialQuantities[c.product.id] = c.qty;
    });
    setProductQuantities(initialQuantities);
  }, productQuantities);

  const handleQtyChange = (event, product_id) => {
    // console.log("Clicked");
    const quantity = event.target.value;
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product_id]: quantity,
    }));
  };

  // console.log(cartTotal);
  // console.log(typeof cart)

  const UpdateCart = async (
    cart_id,
    item_id,
    product_id,
    price,
    shipping_amount,
    color,
    size
  ) => {
    const qtyValue = productQuantities[product_id];

    // console.log("cart_id:", cart_id);
    // console.log("item_id:", item_id);
    // console.log("qtyValue:", qtyValue);
    // console.log("product_id:", product_id);

    try {
      // Await the addToCart function
      await addToCart(
        product_id,
        userData?.user_id,
        qtyValue,
        price,
        shipping_amount,
        currentAddress.country,
        color,
        size,
        cart_id,
        isAddingToCart
      );

      // Fetch the latest cart data after addToCart is completed
      fetchCartData(cart_id, userData?.user_id);
      fetchCartTotal(cart_id, userData?.user_id);
    } catch (error) {
      // Handle error, e.g., display an error message
      console.log(error);
    }
  };

  // Remove Item From Cart
  const handleDeleteClick = async (cartId, itemId) => {
    // console.log("Deleting...");
    const url = userData?.user_id
      ? `cart-delete/${cartId}/${itemId}/${userData.user_id}/`
      : `cart-delete/${cartId}/${itemId}/`;

    try {
      await axios.delete(url);
      // Add any additional logic or state updates after successful deletion
      fetchCartData(cart_id, userData?.user_id);
      fetchCartTotal(cart_id, userData?.user_id);

      const cart_url = userData?.user_id
        ? `cart-list/${cart_id}/${userData?.user_id}/`
        : `cart-list/${cart_id}/`;
      const response = await axios.get(cart_url);

      setCartCount(response.data.length);
    } catch (error) {
      console.error("Error deleting item:", error);
      // Handle errors or update state accordingly
    }
  };

  // Shipping Details
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name);
    // console.log(value);
    // Use computed property names to dynamically set the state based on input name
    switch (name) {
      case "fullName":
        setFullName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "mobile":
        setMobile(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "city":
        setCity(value);
        break;
      case "state":
        setState(value);
        break;
      case "zip":
        setZip(value);
        break;
      case "country":
        setCountry(value);
        break;
      default:
        break;
    }
  };

  const createCartOrder = async () => {
    if (
      !fullName ||
      !email ||
      !mobile ||
      !address ||
      !city ||
      !state ||
      !country
    ) {
      // If any required field is missing, show an error message or take appropriate action
      console.log("Please fill in all required fields");
      Swal.fire({
        icon: "warning",
        title: "Missing Fields!",
        text: "All fields are required before checkout",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("full_name", fullName);
      formData.append("email", email);
      formData.append("mobile", mobile);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("zip", zip);
      formData.append("country", country);
      formData.append("cart_id", cart_id);
      formData.append("user_id", userData ? userData.user_id : 0);

      const response = await axios.post("create-order/", formData);
      console.log(response.data.order_oid);

      navigate(`/checkout/${response.data.order_oid}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="mx-auto max-w-screen-xl font-[roboto] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 ">
        <div className="container mx-auto mt-10">
          <div className="sm:flex shadow-md my-10">
            <div className="  w-full  sm:w-3/4 bg-white px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                <h2 className="font-semibold text-2xl">{cartCount || 0} Items</h2>
              </div>
              {cart?.map((c, index) => (
                <div
                  className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50"
                  key={index}
                >
                  <div className="md:w-4/12 2xl:w-1/4 w-full">
                    <Link to={`/product/${c?.product?.slug}/${c?.product?.id}`}>
                      <img
                        src={c.product?.image}
                        alt="Black Leather Purse"
                        className="object-center object-cover md:block hidden"
                      />
                      <img
                        src={c.product?.image}
                        alt="Black Leather Purse"
                        className="md:hidden w-full  object-center object-cover"
                      />
                    </Link>
                  </div>
                  <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                    <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
                      {c.product?.sku}
                    </p>
                    <div className=" items-center justify-between w-full lg:flex">
                      <p className="text-base font-black leading-5 text-gray-800">
                        {/* {c.product?.title} */}
                        <Link
                          to={`/product/${c.product?.slug}/${c.product?.id}/`}
                          className="fw-bold text-dark mb-4"
                        >
                          {c?.product?.title.slice(0, 80)}...
                        </Link>
                      </p>

                      <label
                        htmlFor="UserEmail"
                        className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 mt-2 mb-2"
                      >
                        <span className="flex text-xs font-medium text-gray-700">
                          {" "}
                          Quantity{" "}
                          <button
                            onClick={() =>
                              UpdateCart(
                                cart_id,
                                c.id,
                                c.product.id,
                                c.product.price,
                                c.product.shipping_amount,
                                c.color,
                                c.size
                              )
                            }
                          >
                            <AiOutlineReload
                              size={18}
                              className="cursor-pointer ml-2 bg-[#f58634] text-white hover:bg-[#3e4095]"
                              title="Update Quantity"
                            />
                          </button>
                        </span>

                        <input
                          type="number"
                          min={1}
                          id={`qtyInput-${c.product.id}`}
                          defaultValue={1}
                          placeholder={1}
                          value={productQuantities[c.product.id] || c.qty}
                          className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                          onChange={(e) => handleQtyChange(e, c.product.id)}
                        />
                      </label>

                      {/* <TextField
                      id="outlined-basic"
                      type="number"
                      label="Quantity"
                      variant="outlined"
                      value={value}
                      onChange={handleChange}
                      InputProps={{ inputProps: { min: 1 } }} // Set minimum allowed value to 0
                      className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none"
                      sx={{
                        "& .MuiInputBase-root": {
                          // Target the input element
                          paddingTop: "5px",
                        },
                        "& .MuiInputBase-input": {
                          // Target the input field itself
                          padding: "10px",
                        },
                      }}
                    /> */}

                      {/* <input
                      type="number"
                      className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none"
                      placeholder="Quantity"
                    /> */}
                    </div>
                    <p className="text-xs leading-3 text-gray-600 pt-1">
                      <b>Price: </b> ${c.price}
                    </p>
                    {c.color != "No color selected" && (
                      <p className="text-xs leading-3 text-gray-600 pt-1">
                        <b>Color: </b> {c.color}
                      </p>
                    )}
                    {c.size != "No Size" && (
                      <p className="w-96 text-xs leading-3 text-gray-600 pt-1">
                        <b>Size: </b> {c.size}
                      </p>
                    )}
                    <p className="text-xs leading-3 text-gray-600 pt-1">
                      <b>Stock Qty: </b> {c.product?.stock_qty}
                    </p>
                    {c.product?.vendor?.name != "" && (
                      <p className="text-xs leading-3 text-gray-600 pt-1">
                        <b>Vendor: </b> {c.product?.vendor?.name}
                      </p>
                    )}

                    <div className="items-center justify-between pt-2 lg:flex">
                      <div className="flex itemms-center mt-2 lg:mt-0">
                        <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">
                          Add to wishlist
                        </p>
                        <button
                          onClick={() => handleDeleteClick(cart_id, c.id)}
                        >
                          <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">
                            Remove
                          </p>
                        </button>
                      </div>
                      <p className="text-base font-black leading-none text-gray-800 mt-4 lg:mt-0">
                        Sub Total: ${c.sub_total}
                        <br />
                        <span className="text-xs text-red-500">
                          You save 15%
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {cart?.length < 1 && (
                <>
                  <h5>Your Cart Is Empty</h5>
                  {/* <Link to="/">
                    {" "}
                    <i className="fas fa-shopping-cart"></i> Continue Shopping
                  </Link> */}
                </>
              )}

              <Link
                to="/products/"
                className="flex font-semibold text-[#3e4095] text-sm mt-10"
              >
                <svg
                  className="fill-current mr-2 text-[#3e4095] w-4"
                  viewBox="0 0 448 512"
                >
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>{" "}
                <i className="fas fa-shopping-cart"></i> Continue Shopping
              </Link>

              <div className="border-t mt-8">
                <div className="w-full max-w-3xl mx-auto p-8">
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
                        Personal Information
                      </h2>
                      <div className="mt-4">
                        <label
                          htmlFor="address"
                          className="block text-gray-700 dark:text-white mb-1"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                          onChange={handleChange}
                          value={fullName}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-gray-700 dark:text-white mb-1"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                            onChange={handleChange}
                            value={email}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="mobile"
                            className="block text-gray-700 dark:text-white mb-1"
                          >
                            Mobile
                          </label>
                          <input
                            type="text"
                            id="mobile"
                            name="mobile"
                            className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                            onChange={handleChange}
                            value={mobile}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
                        Shipping Address
                      </h2>
                      <div className="mt-4">
                        <label
                          htmlFor="address"
                          className="block text-gray-700 dark:text-white mb-1"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                          onChange={handleChange}
                          value={address}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <label
                            htmlFor="city"
                            className="block text-gray-700 dark:text-white mb-1"
                          >
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                            onChange={handleChange}
                            value={city}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="state"
                            className="block text-gray-700 dark:text-white mb-1"
                          >
                            State
                          </label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                            onChange={handleChange}
                            value={state}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <label
                            htmlFor="zip"
                            className="block text-gray-700 dark:text-white mb-1"
                          >
                            ZIP/Postal Code
                          </label>
                          <input
                            type="text"
                            id="zip"
                            name="zip"
                            className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                            onChange={handleChange}
                            value={zip}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="country"
                            className="block text-gray-700 dark:text-white mb-1"
                          >
                            Country
                          </label>
                          <input
                            type="text"
                            id="country"
                            name="country"
                            className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                            onChange={handleChange}
                            value={country}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="summary"
              className=" w-full   sm:w-1/4   md:w-1/2     px-8 py-10"
            >
              <h1 className="font-semibold text-2xl border-b pb-8">
                Cart Summary
              </h1>
              {/* <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Subtotal
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      $56.00
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Discount{" "}
                      <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">
                        STUDENT
                      </span>
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      -$28.00 (50%)
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Shipping
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      $8.00
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                    Total
                  </p>
                  <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                    $36.00
                  </p>
                </div>
              </div> */}
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">
                  Subtotal
                </span>
                <span className="text-sm">
                  ${cartTotal.sub_total?.toFixed(2)}
                </span>
              </div>
              {/* <div className="flex justify-between  mb-5">
                <span className="font-semibold text-sm uppercase">
                  Shipping
                </span>
                <span className="text-sm">$56.00</span>
              </div> */}
              <div className="flex justify-between  mb-5">
                <span className="font-semibold text-sm uppercase">Tax Fee</span>
                <span className="text-sm">${cartTotal.tax?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between  mb-5">
                <span className="font-semibold text-sm uppercase">
                  Service Fee
                </span>
                <span className="text-sm">
                  ${cartTotal.service_fee?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between  mb-5">
                <span className="font-semibold text-sm uppercase">
                  Shipping Fee
                </span>
                <span className="text-sm">
                  ${cartTotal.shipping?.toFixed(2)}
                </span>
              </div>
              {/* <div className="flex justify-between  mb-5">
                <span className="font-semibold text-sm uppercase">
                  Discount{" "}
                  <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">
                    STUDENT
                  </span>
                </span>
                <span className="text-sm">$56.00</span>
              </div> */}

              {/* <div>
                <label className="font-medium inline-block mb-3 text-sm uppercase">
                  Shipping
                </label>
                <select className="block p-2 text-gray-600 w-full text-sm">
                  <option>Standard shipping - $10.00</option>
                </select>
              </div> */}

              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                  <span>${cartTotal.total?.toFixed(2)}</span>
                </div>
                {cart.length > 0 && (
                  <button
                    className="bg-[#3e4095] font-semibold hover:bg-[#f58634] py-3 text-sm text-white uppercase w-full"
                    onClick={createCartOrder}
                  >
                    Proceed To Checkout {" > "}
                  </button>
                )}
              </div>

              {/* <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700 mt-10">
                <div className="">
                  <label
                    htmlFor="promo"
                    className="font-semibold inline-block mb-3 text-sm uppercase"
                  >
                    Promo Code
                  </label>
                  <input
                    type="text"
                    id="promo"
                    placeholder="Enter your code"
                    className="p-2 text-sm w-full rounded-lg shadow-md border mb-2"
                  />
                </div>
                <button className="bg-[#f58634] hover:bg-[#3e4095] px-5 py-2 text-sm text-white uppercase">
                  Apply
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
