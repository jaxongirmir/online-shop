import { configureStore } from "@reduxjs/toolkit";
import wishesSlice from "./wishesSlice";
import cartSlice from "./cartSlice";

export const store = configureStore({
  reducer: {
    wishes: wishesSlice,
    cart: cartSlice,
  },
});
