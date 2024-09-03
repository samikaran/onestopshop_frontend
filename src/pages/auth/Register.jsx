import { useEffect, useState } from "react";
import { register } from "../../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import styles from "../../assets/styles/styles";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, []);

  const resetForm = () => {
    setFullname("");
    setEmail("");
    setPhone("");
    setPassword("");
    setPassword2("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set isLoading to true when the form is submitted
    setIsLoading(true);

    const { error } = await register(
      fullname,
      email,
      phone,
      password,
      password2
    );
    if (error) {
      alert(JSON.stringify(error));
    } else {
      navigate("/");
      resetForm();
    }

    // Reset isLoading to false when the operation is complete
    setIsLoading(false);
  };

  return (
    <>
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              <h1 className="text-center text-2xl font-bold text-[#000] sm:text-3xl">
                Register as a new user!
              </h1>
              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="fullname"
                          autoComplete="fullname"
                          required
                          value={fullname}
                          onChange={(e) => setFullname(e.target.value)}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          name="email"
                          autoComplete="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="phone"
                          autoComplete="phone"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
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
                          name="password"
                          id="confirm-password"
                          autoComplete="current-password"
                          required
                          onChange={(e) => setPassword2(e.target.value)}
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
                    <p className="font-bold text-sm text-[#ff4c4c]">
                      {password2 !== password ? "Passwords do not match" : ""}
                    </p>
                    <div>
                      <button
                        type="submit"
                        className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#f58634] hover:bg-[#3e4095]"
                      >
                        {isLoading ? <>Processing...</> : <>Sign Up</>}
                      </button>
                    </div>
                    <div className={`${styles.noramlFlex} w-full`}>
                      <h4>Already have an account?</h4>
                      <Link to={"/login/"} className="text-[#3e4095] pl-2">
                        Sign In
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 lg:py-12">
              <p className="max-w-xl text-lg">
                Welcome to OneStopShop! Ready to start shopping and enjoying
                exclusive benefits? Fill out the form to create your account and
                unlock a world of amazing products and deals.
              </p>
              <p className="max-w-xl text-lg">
                Join our community of savvy shoppers and gain access to features
                like saved carts, order tracking, and personalized
                recommendations tailored just for you.
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

export default Register;
