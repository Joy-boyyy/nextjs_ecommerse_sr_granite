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
      // state.wishlistIds = state.allWish.map((item) => parseInt(item.id));
      // Update the wishlistIds to reflect the changes
      state.wishlistIds = state.allWish.map((item) => parseInt(item.id));
    },

    // ----- add wish from cloud

    addWishFromCloud(state, action) {
      const payloadObj = action.payload;
      state.allWish = payloadObj;
      state.wishlistIds = payloadObj.map((item) => parseInt(item.id));
    },
  },
});

export const { addWish, addWishFromCloud } = wishlistSLice.actions;
export default wishlistSLice.reducer;
