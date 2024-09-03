import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import apiInstance from "../../utils/axios";
import Swal from "sweetalert2";
import styles from "../../assets/styles/styles";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const axios = apiInstance;
  const [searchParams] = useSearchParams();
  const otp = searchParams.get("otp");
  const uuid = searchParams.get("uuid");
  const [isLoading, setIsLoading] = useState(false);

  //   console.log(email);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    // console.log(email);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // console.log(email);
    axios.get(`user/password-reset/${email}/`).then((res) => {
      console.log(res.data);
      Swal.fire({
        icon: "success",
        title: "Password Reset Email Sent!",
      });
    });
  };

  return (
    <>
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              <h1 className="text-center text-2xl font-bold text-[#000] sm:text-3xl">
                Forgot Password
              </h1>
              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                  <form className="space-y-6" onSubmit={handleEmailSubmit}>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          name="email"
                          autoComplete="email"
                          required
                          onChange={handleEmailChange}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#f58634] hover:bg-[#3e4095]"
                        // onClick={handleEmailSubmit}
                      >
                        {isLoading ? <>Processing...</> : <>Reset Password</>}
                      </button>
                    </div>
                    <div className={`${styles.noramlFlex} w-full`}>
                      <h4>Don't have an account?</h4>
                      <Link to={"/register/"} className="text-[#3e4095] pl-2">
                        Sign Up
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 lg:py-12">
              <p className="max-w-xl text-lg">
                Ready to explore amazing deals and shop till you drop? Just log
                in to access your account and dive into a world of endless
                possibilities.
              </p>

              <div className="mt-8">
                <a href="#" className="text-2xl font-bold text-[#3e4095]">
                  {" "}
                  Happy shopping!{" "}
                </a>

                <address className="mt-2 not-italic">:-)</address>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
