import axios from "axios";
import Card from "./Card";

const SelectedCardComponent = async ({ params }) => {
  const { selectedCard } = await params;
  try {
    const axiosOnlyCard = await axios.get(
      `https://dummyjson.com/products/${selectedCard}`
    );

    if (axiosOnlyCard.data) {
      return <Card cardDataDetails={axiosOnlyCard.data} />;
    } else {
      return <h1>No any Card Found</h1>;
    }
  } catch (err) {
    console.log(err.message || err);
    return <h1>Something wrong with dynamic data</h1>;
  }
  // console.log("axiosOnlyCard", axiosOnlyCard.data);
};

export default SelectedCardComponent;
