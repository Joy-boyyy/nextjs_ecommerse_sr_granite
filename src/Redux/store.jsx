import { configureStore } from "@reduxjs/toolkit";
import selectedCatSliceVar from "./slices/selectedCategorySlice";
import wishlistSLice from "./slices/wishlistSlice";
import cartSliceVar from "./slices/cartSlice";
import searchSliceVar from "./slices/searchResult";

const store = configureStore({
  reducer: {
    selectedCatSliceVar,
    wishlistSLice,
    cartSliceVar,
    searchSliceVar,
  },
});

export default store;
