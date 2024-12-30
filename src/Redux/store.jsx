import { configureStore } from "@reduxjs/toolkit";
import selectedCatSliceVar from "./slices/selectedCategorySlice";
import wishlistSLice from "./slices/wishlistSlice";
import cartSliceVar from "./slices/cartSlice";
import searchSliceVar from "./slices/searchResult";
import orderDetailsContainerSlice from "./slices/orderDetailsSlice";

const store = configureStore({
  reducer: {
    selectedCatSliceVar,
    wishlistSLice,
    cartSliceVar,
    searchSliceVar,
    orderDetailsContainerSlice,
  },
});

export default store;
