import React from "react";
import { Link } from "react-router-dom";
// import { navItems } from "../../static/data";
import styles from "../../assets/styles/styles";

const Navbar = ({ active }) => {
  const navItems = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Best Selling",
      url: "/best-selling",
    },
    {
      title: "Products",
      url: "/products",
    },
    {
      title: "Events",
      url: "/events",
    },
    {
      title: "FAQ",
      url: "/faq",
    },
  ];

  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
      {navItems &&
        navItems.map((i, index) => (
          <div className="flex" key={index}>
            <Link
              to={i.url}
              className={`${
                active === index + 1
                  ? "text-[#17dd1f]"
                  : "text-black 800px:text-[#000]"
              } pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
