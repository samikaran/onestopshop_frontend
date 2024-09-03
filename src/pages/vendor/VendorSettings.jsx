import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// For MUI Tab
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import moment from "moment";

import apiInstance from "../../utils/axios";
import UserData from "../../components/plugin/UserData";
import Sidebar from "./Sidebar";
import Breadcrumb from "./Breadcrumb";
import { toast } from "react-toastify";

// For MUI Tab
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const VendorSettings = () => {
  // For MUI Tab
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [profileData, setProfileData] = useState({
    full_name: "",
    mobile: "",
    email: "",
    about: "",
    country: "",
    city: "",
    state: "",
    address: "",
    p_image: "",
  });
  const [vendorData, setVendorData] = useState([]);
  const [vendorImage, setVendorImage] = useState("");
  const [profileImage, setprofileImage] = useState("");
  const [loading, setLoading] = useState(false);

  const axios = apiInstance;
  const userData = UserData();

  if (UserData()?.vendor_id === 0) {
    window.location.href = "/vendor/register/";
  }

  const fetchProfileData = async () => {
    try {
      axios.get(`vendor-settings/${userData?.user_id}/`).then((res) => {
        // setProfileData(res.data);
        setProfileData({
          full_name: res.data?.full_name,
          email: res.data.user.email,
          phone: res.data.user.phone,
          about: res.data.about,
          country: res.data.country,
          zip: res.data.zip,
          city: res.data.city,
          state: res.data.state,
          address: res.data.address,
          p_image: res.data.image,
        });
        setprofileImage(res.data.image);
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const fetchVendorData = async () => {
    try {
      axios.get(`vendor-shop-settings/${userData?.vendor_id}/`).then((res) => {
        setVendorData(res.data);
        setVendorImage(res.data.image);
        console.log("res.data.image:", res.data.image);
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
    fetchVendorData();
  }, []);

  console.log(vendorData);

  const handleInputChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.files[0],
    });
  };

  const handleShopInputChange = (event) => {
    setVendorData({
      ...vendorData,
      [event.target.name]: event.target.value,
    });
  };

  const handleShopFileChange = (event) => {
    setVendorData({
      ...vendorData,
      [event.target.name]: event.target.files[0],
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await axios.get(`user/profile/${userData?.user_id}/`);

    const formData = new FormData();
    if (profileData.p_image && profileData.p_image !== res.data.image) {
      formData.append("image", profileData.p_image);
    }
    formData.append("full_name", profileData.full_name);
    formData.append("about", profileData.about);
    formData.append("country", profileData.country);
    formData.append("zip", profileData.zip);
    formData.append("city", profileData.city);
    formData.append("state", profileData.state);
    formData.append("address", profileData.address);

    try {
      await apiInstance.patch(
        `vendor-settings/${userData?.user_id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchProfileData();
      //   Swal.fire({
      //     icon: "success",
      //     title: "Profile updated successfully",
      //   });
      toast.success("Profile updated successfully");
      setLoading(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleShopFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await axios.get(`vendor-shop-settings/${userData?.vendor_id}/`);

    const formData = new FormData();
    if (vendorData.image && vendorData.image !== res.data.image) {
      formData.append("image", vendorData.image);
    }
    formData.append("name", vendorData.name);
    formData.append("description", vendorData.description);
    formData.append("mobile", vendorData.mobile);

    try {
      await apiInstance.patch(
        `vendor-shop-settings/${userData?.vendor_id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //   Swal.fire({
      //     icon: "success",
      //     title: "Shop updated successfully",
      //   });
      toast.success("Profile updated successfully");
      setLoading(false);
      await fetchVendorData();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  //   For MUI Tab

  return (
    <>
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-1 lg:py-12">
              <Sidebar route="setting" />
            </div>
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-4 lg:p-12">
              <Breadcrumb title="Setting" />

              {/* Contents Here */}
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Store" {...a11yProps(0)} />
                    <Tab label="Profile" {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  <div className="overflow-x-auto mt-5">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="...">
                        <header className="px-2 py-4 mt-16 flex flex-col justify-center items-center text-center">
                          {profileData.p_image && (
                            <img
                              className="inline-flex object-cover border-2 border-[#f58634] "
                              //   rounded-full bg-indigo-50 h-24 w-24 !h-48 !w-48
                              src={vendorImage}
                              alt={profileData.full_name + " Image"}
                            />
                          )}
                          <h1 className="text-2xl text-gray-500 font-bold mt-2">
                            {vendorData.name}
                          </h1>
                          <p>{vendorData.description}</p>
                        </header>
                      </div>
                      <div className="col-span-2 ...">
                        <div className="max-w-4xl mx-auto font-[sans-serif] text-[#333] p-6">
                          <form
                            onSubmit={handleShopFormSubmit}
                            method="POST"
                            encType="multipart/form-data"
                          >
                            <div className="grid sm:grid-cols-2 gap-y-7 gap-x-12">
                              <div>
                                <label className="text-sm mb-2 block">
                                  Shop Avatar
                                </label>
                                <input
                                  type="file"
                                  className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                  placeholder="Enter name"
                                  onChange={handleShopFileChange}
                                  name="image"
                                />
                              </div>
                              <div>
                                <label className="text-sm mb-2 block">
                                  Shop Name
                                </label>
                                <input
                                  type="text"
                                  className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                  placeholder="Enter full name"
                                  value={vendorData?.name}
                                  onChange={handleShopInputChange}
                                  name="name"
                                />
                              </div>
                              <div>
                                <label className="text-sm mb-2 block">
                                  Mobile
                                </label>
                                <input
                                  type="text"
                                  className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                  placeholder="Enter mobile"
                                  value={vendorData?.mobile}
                                  onChange={handleShopInputChange}
                                  name="mobile"
                                />
                              </div>
                              <div>
                                <label className="text-sm mb-2 block">
                                  Shop Email
                                </label>
                                <input
                                  type="text"
                                  className="bg-gray-200 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                  placeholder="Enter email"
                                  value={vendorData?.email}
                                  name="email"
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="grid sm:grid-cols-1 gap-y-7 gap-x-12 mt-5">
                              <div>
                                <label className="text-sm mb-2 block">
                                  Shop Description
                                </label>
                                <input
                                  type="text"
                                  className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                  placeholder="Enter description"
                                  value={vendorData?.description}
                                  onChange={handleShopInputChange}
                                  name="description"
                                />
                                {/* <textarea
                                  className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                  onChange={handleShopInputChange}
                                  name="description"
                                  value={vendorData?.description}
                                >
                                  {vendorData?.description}
                                </textarea> */}
                              </div>
                              <div className="!mt-10 flex">
                                {loading === false && (
                                  <button
                                    type="submit"
                                    className="min-w-[150px] py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                                  >
                                    Save Changes
                                  </button>
                                )}
                                {loading === true && (
                                  <button
                                    className="min-w-[150px] py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                                    disabled
                                  >
                                    Saving ...
                                  </button>
                                )}
                                <Link
                                  className="min-w-[150px] py-3 px-4 text-sm font-semibold rounded text-white bg-[#f58634] hover:bg-[#f58634] focus:outline-none ml-2"
                                  to={`/vendor/${vendorData.slug}/`}
                                >
                                  View Shop
                                </Link>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <div className="overflow-x-auto mt-5">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="...">
                        <header className="px-2 py-4 mt-16 flex flex-col justify-center items-center text-center">
                          {profileData.p_image && (
                            <img
                              className="inline-flex object-cover border-2 border-[#f58634] rounded-full bg-indigo-50 h-24 w-24 !h-48 !w-48"
                              src={profileImage}
                              alt=""
                            />
                          )}

                          {!profileData.p_image && (
                            <img
                              className="inline-flex object-cover border-2 border-[#f58634] rounded-full bg-indigo-50 h-24 w-24 !h-48 !w-48"
                              src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif"
                              alt=""
                            />
                          )}
                          <h1 className="text-2xl text-gray-500 font-bold mt-2">
                            {profileData.full_name}
                          </h1>
                          {profileData.about && <p>{profileData?.about}</p>}
                        </header>
                      </div>
                      <div className="col-span-2 ...">
                        <div className="max-w-4xl mx-auto font-[sans-serif] text-[#333] p-6">
                          <form
                            onSubmit={handleFormSubmit}
                            method="POST"
                            encType="multipart/form-data"
                          >
                            <div className="grid sm:grid-cols-2 gap-y-7 gap-x-12">
                              <div>
                                <label className="text-sm mb-2 block">
                                  Profile Image
                                </label>
                                <input
                                  type="file"
                                  className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                  placeholder="Enter name"
                                  onChange={handleFileChange}
                                  name="p_image"
                                />
                              </div>
                              <div>
                                <label className="text-sm mb-2 block">
                                  Full Name
                                </label>
                                <input
                                  type="text"
                                  className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                  placeholder="Enter full name"
                                  value={profileData?.full_name}
                                  onChange={handleInputChange}
                                  name="full_name"
                                />
                              </div>
                              <div>
                                <label className="text-sm mb-2 block">
                                  Email address
                                </label>
                                <input
                                  type="text"
                                  className="bg-gray-200 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                  placeholder="Enter email"
                                  value={profileData?.email}
                                  name="email"
                                  readOnly
                                />
                              </div>
                              <div>
                                <label className="text-sm mb-2 block">
                                  Mobile No.
                                </label>
                                <input
                                  type="number"
                                  className="bg-gray-200 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                  placeholder="Enter mobile number"
                                  value={profileData?.phone}
                                  name="phone"
                                  readOnly
                                />
                              </div>
                              <div>
                                <label className="text-sm mb-2 block">
                                  Address
                                </label>
                                <input
                                  name="address"
                                  type="text"
                                  className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                  placeholder="Enter address"
                                  value={profileData?.address}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div>
                                <label className="text-sm mb-2 block">
                                  City
                                </label>
                                <input
                                  name="city"
                                  type="text"
                                  className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                  placeholder="Enter city"
                                  value={profileData?.city}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div>
                                <label className="text-sm mb-2 block">
                                  State
                                </label>
                                <input
                                  name="state"
                                  type="text"
                                  className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                  placeholder="Enter city"
                                  value={profileData?.state}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div>
                                <label className="text-sm mb-2 block">
                                  ZIP / Postal Code
                                </label>
                                <input
                                  name="zip"
                                  type="text"
                                  className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                  placeholder="Enter zip / postal code"
                                  value={profileData?.zip}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div>
                                <label className="text-sm mb-2 block">
                                  Country
                                </label>
                                <input
                                  name="country"
                                  type="text"
                                  className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                  placeholder="Enter zip / postal code"
                                  value={profileData?.country}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                            <div className="grid sm:grid-cols-1 gap-y-7 gap-x-12 mt-5">
                              <div>
                                <label className="text-sm mb-2 block">
                                  About Me
                                </label>
                                <input
                                  type="text"
                                  className="bg-gray-200 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                  placeholder="About me"
                                  name="about"
                                  value={profileData?.about}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                            <div className="!mt-10">
                              {loading === false && (
                                <button
                                  type="submit"
                                  className="min-w-[150px] py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                                >
                                  Save Changes
                                </button>
                              )}

                              {loading === true && (
                                <button
                                  className="min-w-[150px] py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                                  disabled
                                >
                                  Saving ...
                                </button>
                              )}
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </CustomTabPanel>
              </Box>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VendorSettings;
