import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Nav from "../../../components/home/Nav";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../../store/reducers/authReducer";
import { useUserLoginMutation } from "../../../store/services/authService";

const Login = () => {
  const [errors, setErrors] = useState([]);
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const [loginUser, response] = useUserLoginMutation();
  const onSubmit = (e) => {
    e.preventDefault();
    loginUser(state);
  };
  useEffect(() => {
    if (response.isError) {
      setErrors(response?.error?.data?.errors);
    }
  }, [response?.error?.data]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (response.isSuccess) {
      localStorage.setItem("userToken", response?.data?.token);
      dispatch(setUserToken(response?.data?.token));
      navigate("/user");
    }
  }, [response.isSuccess]);
  const showError = (name) => {
    const exist = errors.find((err) => err.path === name);
    if (exist) {
      return exist.msg;
    } else {
      return false;
    }
  };
  return (
    <>
      <Nav />
      <div className="mt-[70px] pb-[80px]">
        <motion.div
          initial={{ opacity: 0, x: "-100vw" }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center"
        >
          <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
            <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
              <div className="my-3 text-4xl font-bold tracking-wider text-center">
                <a href="#">Revibe Store</a>
              </div>
              <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
                Experience the ease of Revibe&apos;s technology, where you can
                concentrate solely on curating the perfect fashion items
              </p>
              <p className="flex flex-col items-center justify-center mt-10 text-center">
                <span>Don&apos;t have an account?</span>
                <Link to="/register" className="underline">
                  Get Started!
                </Link>
              </p>
            </div>
            <div className="p-5 bg-white md:flex-1">
              <h3 className="my-4 text-2xl font-semibold text-gray-700">
                Account Login
              </h3>
              <form onSubmit={onSubmit} className="flex flex-col space-y-5">
                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-500"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoFocus=""
                    className={`px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200
                    ${
                      showError("email")
                        ? "border-rose-600 bg-rose-50"
                        : "border-gray-300 bg-white"
                    }
                    `}
                    value={state.email}
                    onChange={onChange}
                  />
                  {showError("email") && (
                    <span className="error">{showError("email")}</span>
                  )}
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-gray-500"
                    >
                      Password
                    </label>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={`px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200
                    ${
                      showError("password")
                        ? "border-rose-600 bg-rose-50"
                        : "border-gray-300 bg-white"
                    }
                    `}
                    value={state.password}
                    onChange={onChange}
                  />
                  {showError("password") && (
                    <span className="error">{showError("password")}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-semibold text-gray-500"
                  >
                    Remember me
                  </label>
                </div>
                <div>
                  <input
                    type="submit"
                    value={`${response.isLoading ? "Loading..." : "Log in"}`}
                    className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                    disabled={response.isLoading ? true : false}
                  />
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};
export default Login;
