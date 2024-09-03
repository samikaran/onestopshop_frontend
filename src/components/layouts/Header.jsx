import React, { useContext, useState, useEffect } from "react";
import { useAuthStore } from "../../store/auth";
import { Link } from "react-router-dom";
import { CartContext } from "../plugin/Context";
import styles from "../../assets/styles/styles";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import UserDropdown from "./UserDropdown";
import CategoryDropdown from "./CategoryDropdown";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";

const Header = ({ activeHeading }) => {
  const cartCount = useContext(CartContext);
  // console.log(cartCount);
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);

  // console.log(user());

  // console.log("user().vendor_id", user().vendor_id);

  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    console.log(search);
  };

  const handleSearchSubmit = () => {
    navigate(`/search?query=${search}`);
  };

  const categoriesData = [
    {
      id: 1,
      title: "Computers and Laptops",
      subTitle: "",
      image_Url:
        "https://cdn.shopify.com/s/files/1/1706/9177/products/NEWAppleMacbookProwithM1ProChip14InchLaptop2021ModelMKGQ3LL_A_16GB_1TBSSD_custommacbd.jpg?v=1659592838",
    },
    {
      id: 2,
      title: "cosmetics and body care",
      subTitle: "",
      image_Url:
        "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-07/kosme1.png",
    },
    {
      id: 3,
      title: "Accesories",
      subTitle: "",
      image_Url:
        "https://img.freepik.com/free-vector/ordering-goods-online-internet-store-online-shopping-niche-e-commerce-website-mother-buying-babies-clothes-footwear-toys-infant-accessories_335657-2345.jpg?w=2000",
    },
    {
      id: 4,
      title: "Cloths",
      subTitle: "",
      image_Url:
        "https://www.shift4shop.com/2015/images/industries/clothing/clothing-apparel.png",
    },
    {
      id: 5,
      title: "Shoes",
      subTitle: "",
      image_Url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvBQPQMVNRd6TtDkGs2dCri0Y-rxKkFOiEWw&usqp=CAU",
    },
    {
      id: 6,
      title: "Gifts",
      subTitle: "",
      image_Url:
        "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-07/kosme1.png",
    },
    {
      id: 7,
      title: "Pet Care",
      subTitle: "",
      image_Url:
        "https://searchspring.com/wp-content/uploads/2022/10/Hero-Image-Platform-Others-2.png",
    },
    {
      id: 8,
      title: "Mobile and Tablets",
      subTitle: "",
      image_Url:
        "https://st-troy.mncdn.com/mnresize/1500/1500/Content/media/ProductImg/original/mpwp3tua-apple-iphone-14-256gb-mavi-mpwp3tua-637986832343472449.jpg",
    },
    {
      id: 9,
      title: "Music and Gaming",
      subTitle: "",
      image_Url:
        "https://static.vecteezy.com/system/resources/previews/011/996/555/original/3d-black-headphone-illustration-ecommerce-icon-png.png",
    },
    {
      id: 10,
      title: "Others",
      subTitle: "",
      image_Url:
        "https://searchspring.com/wp-content/uploads/2022/10/Hero-Image-Platform-Others-2.png",
    },
  ];

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                src="/logo.png"
                // src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
              />
            </Link>
          </div>
          {/* navitems */}
          <div className={`${styles.noramlFlex}`}>
            {/* <Navbar active={activeHeading} /> */}
          </div>

          <div className={`${styles.noramlFlex}`}>
            {isLoggedIn() ? (
              <>
                <div className={`${styles.noramlFlex}`}>
                  <div className="relative cursor-pointer mr-[15px]">
                    <label
                      htmlFor="sortbox"
                      className="flex items-center space-x-1 cursor-pointer"
                    >
                      <UserDropdown
                        userDisplayName={
                          user().fullname ? user().fullname : user().email
                        }
                      />
                    </label>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to={"/login/"}
                  className="border border-green-500 hover:bg-green-500 hover:text-white text-green-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Sign In
                </Link>
                <Link
                  to={"/register/"}
                  className="bg-[#f68712] hover:bg-[#3e4095] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-1"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#74bf44] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* categories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <CategoryDropdown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>

          {/* search box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={search}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2  border-[2px] rounded-md"
              // border-[#fac287]
            />
            <button onClick={handleSearchSubmit} type="submit">
              <AiOutlineSearch
                size={30}
                className="absolute right-2 top-1.5 cursor-pointer"
              />
            </button>

            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    return (
                      <Link to={`/product/${i._id}`}>
                        <div className="w-full flex items-start-py-3">
                          <img
                            src={`${i.image_Url[0]?.url}`}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              {/* <div
                className="relative cursor-pointer mr-[15px]"
                // onClick={() => setOpenCart(true)}
              > */}
              <Link to={"/cart/"} className="relative cursor-pointer mr-[15px]">
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#f3801f] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cartCount || 0}
                </span>
              </Link>
              {/* </div> */}
            </div>
            {isLoggedIn() && (
              <>
                <div className={`${styles.underline_text}`}>
                  {/* <Link
                to={"/seller/dashboard/"}
                className=" text-white flex items-center justify-center"
              > */}
                  <h1 className="text-[#fff] flex items-center relative after:bg-white after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">
                    {/* {user().vendor_id ? "Seller Panel" : "Become Seller"} */}

                    {user().vendor_id ? (
                      <>
                        <Link to={"/vendor/dashboard/"}>Seller Panel</Link>
                      </>
                    ) : (
                      <>
                        <Link to={"/vendor/register/"}>Become Seller</Link>
                      </>
                    )}
                    <IoIosArrowForward className="ml-1" />
                  </h1>
                  {/* </Link> */}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
