// ----------------- not using
import { createSlice } from "@reduxjs/toolkit";

const selectedCategoryContainer = {
  selectedCategorykey: [],
};

const selectedCatSliceVar = createSlice({
  name: "selectedCat",
  initialState: selectedCategoryContainer,
  reducers: {
    setCategoryFun: (state, actions) => {
      const dataObj = actions.payload;
      state.selectedCategorykey = [...dataObj];
    },
  },
});

export const { setCategoryFun } = selectedCatSliceVar.actions;

export default selectedCatSliceVar.reducer;
