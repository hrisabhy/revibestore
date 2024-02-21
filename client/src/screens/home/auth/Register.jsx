import { motion } from "framer-motion";
import Nav from "../../../components/home/Nav";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUserRegisterMutation } from "../../../store/services/authService";
import { setUserToken } from "../../../store/reducers/authReducer";
import { setSuccess } from "../../../store/reducers/globalReducer";

const Register = () => {
  const [errors, setErrors] = useState([]);
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [registerUser, response] = useUserRegisterMutation();
  console.log(response);
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    registerUser(state);
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
      dispatch(setSuccess(response?.data?.msg));
      navigate("/user");
    }
  }, [response.isSuccess]);
  const showError = (name) => {
    const exist = errors.find((err) => err.path === name);
    console.log(exist);
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
                <span>Already have an account ?</span>
                <Link to="/login" className="underline">
                  Log in
                </Link>
              </p>
            </div>
            <div className="p-5 bg-white md:flex-1">
              <h3 className="my-4 text-2xl font-semibold text-gray-700">
                Register Account
              </h3>
              <form className="flex flex-col space-y-5" onSubmit={onSubmit}>
                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="name"
                    className="text-sm font-semibold text-gray-500"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoFocus=""
                    className={`px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200
                    ${
                      showError("name")
                        ? "border-rose-600 bg-rose-50"
                        : "border-gray-300 bg-white"
                    }
                    `}
                    value={state.name}
                    onChange={onChange}
                  />
                  {showError("name") && (
                    <span className="error">{showError("name")}</span>
                  )}
                </div>
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
                    value={`${response.isLoading ? "Loading..." : "Register"}`}
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
export default Register;
