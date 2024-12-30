import { createSlice } from "@reduxjs/toolkit";

const cartContainerSlice = {
  cartData: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const cartSliceVar = createSlice({
  name: "cart",
  initialState: cartContainerSlice,
  reducers: {
    addProductToCart(state, action) {
      const cardOldData = action.payload;
      const {
        id,
        title,
        description,
        category,
        price,
        discountPercentage,
        rating,
        warrantyInformation,
        shippingInformation,
        thumbnail,
      } = cardOldData;

      const cardRecentData = {
        amount: 1,
        id,
        title,
        description,
        category,
        price,
        discountPercentage,
        rating,
        warrantyInformation,
        shippingInformation,
        thumbnail,
      };

      const cartIdFindingVar = state.cartData.findIndex(
        (cartProp) => cartProp.id === id
      );

      if (cartIdFindingVar > -1) {
        state.cartData[cartIdFindingVar].amount += 1;
      } else {
        state.cartData.push(cardRecentData);
      }

      // Recalculate total price for the entire cart
      state.totalPrice = state.cartData.reduce(
        (total, item) => total + item.price * item.amount,
        0
      );
      // Recalculate total quantity for the entire cart

      state.totalQuantity = state.cartData.reduce(
        (total, item) => total + item.amount,
        0
      );
    },

    incCartAmount(state, action) {
      const { id } = action.payload;
      const incCartVar = state.cartData.find((cartProp) => cartProp.id === id);
      if (incCartVar) {
        incCartVar.amount += 1;
      }

      // Recalculate total price for the entire cart
      state.totalPrice = state.cartData.reduce(
        (total, item) => total + item.price * item.amount,
        0
      );
      // Recalculate total quantity for the entire cart

      state.totalQuantity = state.cartData.reduce(
        (total, item) => total + item.amount,
        0
      );
    },
    decCartAmount(state, action) {
      const { id } = action.payload;
      const decCartVar = state.cartData.find((cartProp) => cartProp.id === id);

      if (decCartVar.amount > 1) {
        decCartVar.amount -= 1;
      }
      // decreasing price of a card

      // Recalculate total price for the entire cart
      state.totalPrice = state.cartData.reduce(
        (total, item) => total + item.price * item.amount,
        0
      );
      // Recalculate total quantity for the entire cart

      state.totalQuantity = state.cartData.reduce(
        (total, item) => total + item.amount,
        0
      );
    },

    // delete cart item

    deleteCartItem(state, action) {
      const { id } = action.payload;
      state.cartData = state.cartData.filter((cartProp) => cartProp.id !== id);

      // Recalculate total price for the entire cart
      state.totalPrice = state.cartData.reduce(
        (total, item) => total + item.price * item.amount,
        0
      );
      // Recalculate total quantity for the entire cart

      state.totalQuantity = state.cartData.reduce(
        (total, item) => total + item.amount,
        0
      );
    },

    // product from cloud
    addProductCloud(state, action) {
      state.cartData = action.payload;
      // Recalculate total price for the entire cart
      state.totalPrice = state.cartData.reduce(
        (total, item) => total + item.price * item.amount,
        0
      );
      // Recalculate total quantity for the entire cart

      state.totalQuantity = state.cartData.reduce(
        (total, item) => total + item.amount,
        0
      );
    },
  },
});

export const {
  addProductToCart,
  deleteCartItem,
  decCartAmount,
  incCartAmount,
  addProductCloud,
} = cartSliceVar.actions;
export default cartSliceVar.reducer;
