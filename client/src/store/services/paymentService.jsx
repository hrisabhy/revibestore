import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const razorpayService = createApi({
  reducerPath: "razorpay",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
  }),
  endpoints: (builder) => ({
    fetchRazorpayKey: builder.query({
      query: () => "/payment/getkey",
      method: "GET",
    }),
    initiatePayment: builder.mutation({
      query: (requestData) => ({
        url: "/payment/initiate",
        method: "POST",
        body: requestData,
      }),
    }),
    verifyPayment: builder.mutation({
      query: (paymentId) => ({
        url: "/payment/verify",
        method: "POST",
        body: { paymentId },
      }),
    }),
  }),
});

export const {
  useInitiatePaymentMutation,
  useVerifyPaymentMutation,
  useFetchRazorpayKeyQuery,
} = razorpayService;

export default razorpayService;
