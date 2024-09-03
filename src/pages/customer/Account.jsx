import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Breadcrumb from "./Breadcrumb";
import UserProfileData from "../../components/plugin/UserProfileData";

const Account = () => {
  const userProfile = UserProfileData();

  return (
    <>
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-1 lg:py-12">
              <Sidebar route="account" />
            </div>
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-4 lg:p-12">
              {/* <Breadcrumb title="Account" /> */}

              {/* Contents Here */}

              <section className="">
                <div className="row rounded shadow p-3">
                  <h2>Hi {userProfile?.full_name}, </h2>
                  <div className="w-full mb-4 mb-lg-0 h-100">
                    From your account dashboard. you can easily check &amp; view
                    your <Link to={"/customer/orders/"}>orders</Link>, manage
                    your{" "}
                    <Link to={""}>
                      <span>, </span>
                    </Link>
                    <Link to={""}>change password</Link> and{" "}
                    <Link to={""}>edit account</Link> infomations.
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Account;
