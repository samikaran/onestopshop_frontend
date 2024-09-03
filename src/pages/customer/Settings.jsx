import React, { useState, useEffect } from "react";
import apiInstance from "../../utils/axios";
import UserData from "../../components/plugin/UserData";
// import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import Breadcrumb from "./Breadcrumb";

const Settings = () => {
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
  const [loading, setLoading] = useState(false);

  const axios = apiInstance;
  const userData = UserData();

  useEffect(() => {
    // Fetch existing profile data
    const fetchProfileData = async () => {
      try {
        axios.get(`user/profile/${userData?.user_id}/`).then((res) => {
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
        });
      } catch (error) {
        console.error("Error fetching profile data: ", error);
      }
    };

    fetchProfileData();
  }, []);

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
        `customer/setting/${userData?.user_id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Swal.fire({
      //   icon: "success",
      //   title: "Profile updated successfully",
      // });
      toast.success("Profile updated successfully");
      setLoading(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  console.log(profileData);

  return (
    <>
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-1 lg:py-12">
              <Sidebar route="settings" />
            </div>
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-4 lg:p-12">
              <Breadcrumb title="Settings" />

              {/* Contents Here */}
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
                        name="p_image"
                        type="file"
                        className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter name"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div>
                      <label className="text-sm mb-2 block">Full Name</label>
                      <input
                        name="full_name"
                        type="text"
                        className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter full name"
                        value={profileData?.full_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="text-sm mb-2 block">
                        Email address
                      </label>
                      <input
                        name="email"
                        type="text"
                        className="bg-gray-200 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter email"
                        value={profileData?.email}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="text-sm mb-2 block">Mobile No.</label>
                      <input
                        name="phone"
                        type="number"
                        className="bg-gray-200 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter mobile number"
                        value={profileData?.phone}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="text-sm mb-2 block">Address</label>
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
                      <label className="text-sm mb-2 block">City</label>
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
                      <label className="text-sm mb-2 block">State</label>
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
                      <label className="text-sm mb-2 block">Country</label>
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

              <div className="mt-10">
                <Breadcrumb title="Change Password" />

                <div className="max-w-4xl mx-auto font-[sans-serif] text-[#333] p-6">
                  <form>
                    <div className="grid sm:grid-cols-2 gap-y-7 gap-x-12">
                      <div>
                        <label className="text-sm mb-2 block">Curent Password</label>
                        <input
                          name="cpassword"
                          type="password"
                          className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                          placeholder="Enter current password"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-y-7 gap-x-12">
                      <div>
                        <label className="text-sm mb-2 block">New Password</label>
                        <input
                          name="npassword"
                          type="password"
                          className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label className="text-sm mb-2 block">
                          Confirm New Password
                        </label>
                        <input
                          name="cpassword"
                          type="password"
                          className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                          placeholder="Enter new password again"
                        />
                      </div>
                    </div>
                    <div className="!mt-10">
                      <button
                        type="button"
                        className="min-w-[150px] py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                      >
                        Change Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Settings;
