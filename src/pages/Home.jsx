import { React, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import Slider from "../components/home/Slider";
import Categories1 from "../components/home/Categories1";
// import BestDeals from "../components/home/BestDeals";
// import Events from "../components/home/Events";
// import FeaturedProducts from "../components/home/FeaturedProducts";

import apiInstance from "../utils/axios";

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    apiInstance.get(`category/`).then((response) => {
      setCategories(response.data);
      console.log(response.data);
    });
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);
  return (
    <>
      {/* {isLoggedIn() ? (
            <div>
              <Link to="/logout">Logout</Link>
            </div>
          ) : (
            <div>
              <Link to="/login">Login</Link>
            </div>
          )} */}
      <Slider />
      <Categories1 categories={categories} />
      {/* <BestDeals /> */}
      {/* <Events /> */}
      {/* <FeaturedProducts /> */}
    </>
  );
};

export default Home;
