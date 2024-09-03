import React from "react";
import Sidebar from "./Sidebar";

const Account = () => {
  return (
    <>
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-1 lg:py-12">
              <Sidebar route="dashboard" />
            </div>
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-4 lg:p-12">
              {/* <Breadcrumb title="Sample Layout" /> */}

              {/* Contents Here */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Account;
