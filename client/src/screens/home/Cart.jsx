import { BsTrash } from "react-icons/bs";
import Nav from "../../components/home/Nav";
import { discount } from "../../utils/discount";
import Quantity from "../../components/home/Quantity";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  incQuantity,
  decQuantity,
  removeItem,
} from "../../store/reducers/cartReducer";
import { Link, useNavigate } from "react-router-dom";
import {
  useFetchRazorpayKeyQuery,
  useInitiatePaymentMutation,
} from "../../store/services/paymentService";
import { useEffect, useState } from "react";

const Cart = () => {
  const [address, setAddress] = useState("");
  const { userToken, user } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const [initiatePayment, response] = useInitiatePaymentMutation();
  const { data = [], isFetching } = useFetchRazorpayKeyQuery();
  const razorPayKey = data.key;
  const { cart, total } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const orderData = cart.map((item) => ({
    productId: item._id,
    size: item.size,
    color: item.color,
    quantity: item.quantity,
  }));
  const userId = user.id;
  const pay = async (amount) => {
    if (userToken) {
      try {
        if (!razorPayKey) return;
        const { data } = await initiatePayment({
          amount,
          currency: "INR",
        });
        const options = {
          key: razorPayKey,
          amount: data.order.amount,
          currency: "INR",
          name: "Revibe Store",
          description: "Description of the product/service",
          image:
            "https://res.cloudinary.com/dipglpaot/image/upload/v1708679838/j96b6ngkz6drm0zniybp.png", // URL to your company logo
          order_id: data.order.id,
          handler: async (response) => {
            try {
              const verificationResponse = await fetch(
                "http://localhost:5000/api/payment/verify",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    razorpay_order_id: data.order.id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    address,
                    userId,
                    items: orderData,
                  }),
                }
              );
              console.log(verificationResponse);

              if (!verificationResponse.ok) {
                throw new Error(
                  `Payment verification failed: ${verificationResponse.statusText}`
                );
              }

              // Handle successful verification
              if (verificationResponse.statusText == "OK") {
                navigate("/user");
              }
            } catch (error) {
              // Handle verification error
              alert(`Payment verification failed: ${error.message}`);
              console.error(error);
              // Log the error and take appropriate actions
            }
          },
          prefill: {
            name: user?.name,
            email: "user@example.com",
            contact: "9999999999",
          },
          notes: {
            address: "User Address", // Additional notes if needed
          },
          theme: {
            color: "#121212", // Customize the checkout theme color
          },
        };
        const razor = new window.Razorpay(options);
        razor.open();
      } catch (error) {
        console.error("Error initiating payment", error.message);
      }
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    if (response?.isSuccess) {
      console.log("Success");
    }
  }, [response]);
  const inc = (id) => {
    dispatch(incQuantity(id));
  };
  const dec = (id) => {
    dispatch(decQuantity(id));
  };
  const remove = (id) => {
    // verify user that you are really want to delete the project or item
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(removeItem(id));
    }
  };
  return (
    <>
      <Nav />
      <div className="mt-32 container mx-auto mt-10">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">
                {orderData.length} Items
              </h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Quantity
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Price
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Total
              </h3>
            </div>
            {cart.map((item, key) => {
              const total = new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(discount(item.price, item.discount) * item.quantity);
              return (
                <div
                  className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                  key={item._id}
                >
                  <div className="flex w-2/5">
                    <div className="w-20">
                      <img
                        src={`/images/${item.image1}`}
                        alt={item.title}
                        className="h-24"
                      />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">{item.title}</span>
                      <span
                        onClick={() => remove(item._id)}
                        className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                      >
                        Remove
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <svg
                      className="fill-current text-gray-600 w-3"
                      viewBox="0 0 448 512"
                      onClick={() => dec(item._id)}
                    >
                      <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                    <span className="mx-2 border text-center w-8">
                      {item.quantity}
                    </span>

                    <svg
                      className="fill-current text-gray-600 w-3"
                      viewBox="0 0 448 512"
                      onClick={() => inc(item._id)}
                    >
                      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(discount(item.price, item.discount))}
                  </span>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    {total}
                  </span>
                </div>
              );
            })}

            <Link
              to="/"
              className="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </Link>
          </div>

          <div id="summary" className="w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                {orderData.length} Products
              </span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">
                Shipping Address
              </label>
              <input
                type="text"
                className="form-input"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(total)}
                </span>
              </div>
              <button
                className="btn-indigo font-semibold hover:bg-[#33548a] py-3 text-sm text-white uppercase w-full"
                onClick={() => pay(total)}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
