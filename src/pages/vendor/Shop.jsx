import { React, useEffect, useState, useContext } from "react";
import { FaCheckCircle, FaShoppingCart, FaSpinner } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

import apiInstance from "../../utils/axios";
import { CartContext } from "../../components/plugin/Context";
import { addToWishlist } from "../../components/plugin/addToWishlist";
import { addToCart } from "../../components/plugin/addToCart";
import CartID from "../../components/plugin/cartID";
import GetCurrentAddress from "../../components/plugin/UserCountry";
import UserData from "../../components/plugin/UserData";
import ProductCard from "../../components/layouts/products/ProductCard";

const Shop = () => {
  const [products, setProduct] = useState([]);
  const [vendor, setVendor] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedSize, setSelectedSize] = useState({});
  const [colorImage, setColorImage] = useState("");
  const [colorValue, setColorValue] = useState("No Color");
  const [sizeValue, setSizeValue] = useState("No Size");
  const [qtyValue, setQtyValue] = useState(1);
  let [cartCount, setCartCount] = useContext(CartContext);

  let [isAddingToCart, setIsAddingToCart] = useState("Add To Cart");
  const [loadingStates, setLoadingStates] = useState({});

  const axios = apiInstance;
  const currentAddress = GetCurrentAddress();
  const userData = UserData();
  let cart_id = CartID();
  const param = useParams();

  if (UserData()?.vendor_id === 0) {
    window.location.href = "/vendor/register/";
  }

  useEffect(() => {
    axios.get(`vendor-products/${param?.slug}/`).then((res) => {
      setProduct(res.data);
    });
  }, [param]);

  useEffect(() => {
    axios.get(`shop/${param?.slug}/`).then((res) => {
      setVendor(res.data);
      console.log(res.data);
    });
  }, [param]);

  const handleColorButtonClick = (event, product_id, colorName, colorImage) => {
    setColorValue(colorName);
    setColorImage(colorImage);
    setSelectedProduct(product_id);

    setSelectedColors((prevSelectedColors) => ({
      ...prevSelectedColors,
      [product_id]: colorName,
    }));
  };

  const handleSizeButtonClick = (event, product_id, sizeName) => {
    setSizeValue(sizeName);
    setSelectedProduct(product_id);

    setSelectedSize((prevSelectedSize) => ({
      ...prevSelectedSize,
      [product_id]: sizeName,
    }));
  };

  const handleQtyChange = (event, product_id) => {
    setQtyValue(event.target.value);
    setSelectedProduct(product_id);
  };

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

  const handleAddToWishlist = async (product_id) => {
    try {
      await addToWishlist(product_id, userData?.user_id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overflow-x-auto mt-5">
      <header className="px-2 py-4 mt-16 flex flex-col justify-center items-center text-center">
        {vendor.image && (
          <img
            className="inline-flex object-cover border-2 border-[#f58634]  bg-indigo-50 h-24 w-24 "
            //   rounded-full bg-indigo-50 h-24 w-24 !h-48 !w-48
            src={vendor.image}
            alt={vendor.name + " Image"}
          />
        )}
        <h1 className="text-1xl text-gray-500 font-bold mt-2">{vendor.name}</h1>
        <small>{vendor.description}</small>
      </header>

      <div className="w-full flex gap-4 justify-center items-center mt-10">
        <h3 className="text-xl font-bold">{products?.length} Product(s)</h3>

        {/* <div className="xl:w-1/4 xl:h-32 lg:w-1/5 lg:h-32 md:w-1/5 md:h-28 sm:w-1/3 sm:h-[5rem] xs:w-1/3 xs:h-[4rem] flex justify-center items-center rounded-sm text-center text-lg px-6 py-4 border-2 border-dashed border-gray-300 dark:text-white dark:border-2 dark:border-dashed dark:border-gray-700">
          Products
        </div> */}
      </div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-5 lg:items-start lg:gap-8">
            <div className="lg:col-span-5">
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {products?.map((i, index) => (
                  <ProductCard data={i} key={index} />
                ))}

                {products?.length === 0 ? (
                  <h1 className="text-center w-full pb-[100px] text-[20px]">
                    No products found!
                  </h1>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
