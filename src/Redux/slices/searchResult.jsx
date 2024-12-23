import { createSlice } from "@reduxjs/toolkit";

const searchArr = {
  searchResultArr: [],
  searchString: "",
};

const searchSliceVar = createSlice({
  name: "search",
  initialState: searchArr,
  reducers: {
    searchFunSlice(state, action) {
      state.searchResultArr = action.payload;
    },

    searchStringSlice(state, action) {
      state.searchString = action.payload;
    },
  },
});

export const { searchFunSlice, searchStringSlice } = searchSliceVar.actions;
export default searchSliceVar.reducer;
