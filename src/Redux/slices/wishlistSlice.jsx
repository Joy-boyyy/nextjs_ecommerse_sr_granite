import { createSlice } from "@reduxjs/toolkit";

const wishlistObjStore = {
  allWish: [],
  wishlistIds: [],
};

const wishlistSLice = createSlice({
  name: "wishlist",
  initialState: wishlistObjStore,
  reducers: {
    addWish(state, action) {
      const payloadObj = action.payload;
      const foundOldWish = state.allWish.findIndex(
        (findProp) => findProp.id === payloadObj.id
      );
      if (foundOldWish !== -1) {
        state.allWish.splice(foundOldWish, 1);
      } else {
        state.allWish.push(payloadObj);
      }
      state.wishlistIds = state.allWish.map((item) => item.id);
    },
  },
});

export const { addWish } = wishlistSLice.actions;
export default wishlistSLice.reducer;
