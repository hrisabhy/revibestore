import { configureStore } from "@reduxjs/toolkit";
import authService from "./services/authService";
import authReducer from "./reducers/authReducer";
import categoryService from "./services/categoryService";
import productService from "./services/productService";
import globalReducer from "./reducers/globalReducer";
import paymentService from "./services/paymentService";
import cartReducer from "./reducers/cartReducer";
import homeProducts from "./services/homeProducts";
const Store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [categoryService.reducerPath]: categoryService.reducer,
    [productService.reducerPath]: productService.reducer,
    [homeProducts.reducerPath]: homeProducts.reducer,
    [paymentService.reducerPath]: paymentService.reducer,
    authReducer: authReducer,
    globalReducer: globalReducer,
    cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authService.middleware,
      categoryService.middleware,
      productService.middleware,
      homeProducts.middleware,
      paymentService.middleware,
    ]),
});

export default Store;
