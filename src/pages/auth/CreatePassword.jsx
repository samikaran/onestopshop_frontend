import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import apiInstance from "../../utils/axios";
import Swal from "sweetalert2";
import styles from "../../assets/styles/styles";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const CreatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const axios = apiInstance;
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const otp = searchParams.get("otp");
  const uidb64 = searchParams.get("uidb64");
  const reset_token = searchParams.get("reset_token");

  const handleNewPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNewPasswordConfirmChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError(true);
      console.log("Password Does Not Match");
    } else {
      setError(false);

      console.log("otp ======", otp);
      console.log("uidb64 ======", uidb64);
      console.log("reset_token ======", reset_token);
      console.log("password ======", password);

      const formdata = new FormData();

      formdata.append("otp", otp);
      formdata.append("uidb64", uidb64);
      formdata.append("reset_token", reset_token);
      formdata.append("password", password);

      try {
        axios.post(`user/password-change/`, formdata).then((res) => {
          console.log(res.data.code);
          Swal.fire({
            icon: "success",
            title: "Password Changed Successfully",
          });
          navigate("/login");
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "An Error Occured Try Again",
        });
        // console.log(error);
      }
    }
  };

  return (
    <>
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              <h1 className="text-center text-2xl font-bold text-[#000] sm:text-3xl">
                Create New Password
              </h1>
              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                  <form className="space-y-6" onSubmit={handlePasswordSubmit}>
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <div className="mt-1 relative">
                        <input
                          type={visible ? "text" : "password"}
                          name="password"
                          autoComplete="current-password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />

                        {visible ? (
                          <AiOutlineEye
                            className="absolute right-2 top-2 cursor-pointer"
                            size={25}
                            onClick={() => setVisible(false)}
                          />
                        ) : (
                          <AiOutlineEyeInvisible
                            className="absolute right-2 top-2 cursor-pointer"
                            size={25}
                            onClick={() => setVisible(true)}
                          />
                        )}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="confirm-password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Confirm Password
                      </label>
                      <div className="mt-1 relative">
                        <input
                          type={visibleConfirm ? "text" : "password"}
                          name="confirmPassword"
                          id="confirm-password"
                          autoComplete="current-password"
                          required
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />

                        {visibleConfirm ? (
                          <AiOutlineEye
                            className="absolute right-2 top-2 cursor-pointer"
                            size={25}
                            onClick={() => setVisibleConfirm(false)}
                          />
                        ) : (
                          <AiOutlineEyeInvisible
                            className="absolute right-2 top-2 cursor-pointer"
                            size={25}
                            onClick={() => setVisibleConfirm(true)}
                          />
                        )}
                      </div>
                    </div>
                    {error !== null && (
                      <>
                        {error === true ? (
                          <p className="font-bold text-sm text-[#ff4c4c]">
                            Password Does Not Match
                          </p>
                        ) : (
                          <p className="font-bold text-sm text-[#39ba3f]">
                            Password Matched
                          </p>
                        )}
                      </>
                    )}
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

export default CreatePassword;
