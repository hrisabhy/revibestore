import { useParams, Link } from "react-router-dom";
import currency from "currency-formatter";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import Spinner from "../../components/Spinner";
import { discount } from "../../utils/discount";
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import { BsPrinter } from "react-icons/bs";
import {
  useDetailsQuery,
  useDeliverOrderMutation,
} from "../../store/services/orderService";

const OrderDetails = () => {
  const { id } = useParams();
  const { data, isFetching } = useDetailsQuery(id);
  const componentRef = useRef();
  console.log(data);
  const total =
    discount(
      data?.details?.productId?.price,
      data?.details?.productId?.discount
    ) * data?.details?.quantities;
  const [sentUserOrder, response] = useDeliverOrderMutation();
  const sentOrder = () => {
    sentUserOrder(data?.details?._id);
  };
  return (
    <Wrapper>
      <ScreenHeader>
        <div className="flex items-center">
          <Link to="/dashboard/orders">
            <MdOutlineKeyboardBackspace />
          </Link>
          <span className="ml-4"> Order Details</span>
          <span className="ml-4">
            <ReactToPrint
              trigger={() => (
                <button className="flex items-center btn bg-indigo-600 py-1 text-sm font-semibold px-3">
                  <BsPrinter /> <span className="ml-2">print</span>
                </button>
              )}
              content={() => componentRef.current}
            />
          </span>
          <span className="ml-4">
            {!isFetching && !data?.details?.status && (
              <button
                className="btn bg-orange-600 py-1 text-sm font-semibold px-3"
                onClick={sentOrder}
              >
                {response?.isLoading ? "Loading..." : "Mark as Delivered"}
              </button>
            )}
          </span>
        </div>
      </ScreenHeader>
      {!isFetching ? (
        <div ref={componentRef}>
          <h3 className="capitalize text-gray-400">
            order number{" "}
            <span className="text-lg text-gray-300 ml-4">
              #{data?.details?._id}
            </span>
          </h3>
          <div className="flex flex-wrap -mx-5">
            <div className="w-full md:w-8/12 p-5">
              <div>
                <table className="dashboard-table bg-transparent border-gray-600 rounded-none md:rounded-md">
                  <thead>
                    <tr className="dashboard-tr">
                      <th className="dashboard-th">image</th>
                      <th className="dashboard-th">quantities</th>
                      <th className="dashboard-th">price</th>
                      <th className="dashboard-th">total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="dashboard-td">
                        <img
                          src={`/images/${data?.details?.productId?.image1}`}
                          alt="image name"
                          className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                      </td>
                      <td className="dashboard-td">
                        {data?.details?.quantities}
                      </td>
                      <td className="dashboard-td">
                        {currency.format(
                          discount(
                            data?.details?.productId?.price,
                            data?.details?.productId?.discount
                          ),
                          { code: "USD" }
                        )}
                      </td>
                      <td className="dashboard-th">
                        {currency.format(total, { code: "USD" })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-full md:w-4/12 p-5">
              <div className="border border-gray-600 rounded-none md:rounded-md p-4">
                <div className="border-b pb-3 border-b-gray-600">
                  <h4 className="capitalize text-base text-gray-500">
                    customer name
                  </h4>
                  <span className="text-gray-400 text-base font-medium capitalize mt-2">
                    {data?.details?.userId?.name}
                  </span>
                </div>

                <div>
                  <h4 className="capitalize text-base text-gray-500 mt-2">
                    shipping address
                  </h4>
                  <div className="mt-2">
                    <span className="text-gray-400 capitalize block">
                      {data?.details?.address}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};
export default OrderDetails;
