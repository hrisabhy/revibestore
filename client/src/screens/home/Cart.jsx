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
import { useEffect } from "react";

const Cart = () => {
  const { userToken, user } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const [initiatePayment, response] = useInitiatePaymentMutation();
  const { data = [], isFetching } = useFetchRazorpayKeyQuery();
  const razorPayKey = data.key;
  const { cart, total } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const pay = async (amount) => {
    if (userToken) {
      try {
        if (!razorPayKey) return;
        const amountInPaise = Number(amount * 100);
        console.log(typeof amountInPaise);
        const { data } = await initiatePayment({
          amount,
          currency: "INR",
        });
        const options = {
          key: razorPayKey, // Use the fetched Razorpay key
          amount: amountInPaise,
          currency: "INR",
          name: "Revibe Store",
          description: "Description of the product/service",
          image:
            "https://res.cloudinary.com/dipglpaot/image/upload/v1708679838/j96b6ngkz6drm0zniybp.png", // URL to your company logo
          order_id: data.id,
          callback_url: "http://localhost:5000/api/payment/verify", // URL to handle payment verification
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="my-container mt-28"
      >
        {cart.length > 0 ? (
          <>
            <div className="table-container">
              <table className="w-full">
                <thead>
                  <tr className="thead-tr">
                    <th className="th">image</th>
                    <th className="th">name</th>
                    <th className="th">price</th>
                    <th className="th">quantities</th>
                    <th className="th">total</th>
                    <th className="th">delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, key) => {
                    const total = new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(
                      discount(item.price, item.discount) * item.quantity
                    );
                    return (
                      <tr className="even:bg-gray-50" key={item._id}>
                        <td className="td">
                          <img
                            src={`/images/${item.image1}`}
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded-full"
                          />
                        </td>
                        <td className="td font-medium">{item.title}</td>
                        <td className="td font-bold text-gray-900">
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                          }).format(discount(item.price, item.discount))}
                        </td>
                        <td className="td">
                          <Quantity
                            quantity={item.quantity}
                            inc={() => inc(item._id)}
                            dec={() => dec(item._id)}
                            theme="indigo"
                          />
                        </td>
                        <td className="td font-bold ">{total}</td>
                        <td>
                          <span
                            className="cursor-pointer"
                            onClick={() => remove(item._id)}
                          >
                            <BsTrash className="text-rose-600" size={20} />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="bg-indigo-50 p-4 flex justify-end mt-5 rounded-md">
              <div>
                <span className="text-lg font-semibold text-indigo-800 mr-10">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(total)}
                </span>
                <button
                  className="btn bg-indigo-600 text-sm font-medium py-2.5"
                  onClick={() => pay(total)}
                >
                  checkout
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-md text-sm font-medium text-indigo-800">
            Cart is empty!
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Cart;
