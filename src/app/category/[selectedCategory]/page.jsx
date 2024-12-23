import axios from "axios";
import FetchecData from "./FetchecData";

const FunCat = async ({ params }) => {
  const { selectedCategory } = await params;

  try {
    const axiosData = await axios(
      `https://dummyjson.com/products/category/${selectedCategory}`
    );

    if (axiosData.status === 200) {
      console.log("console");
      return (
        <FetchecData
          catData={axiosData.data.products}
          selectedCategory={selectedCategory}
        />
      );
    } else {
      return <h1> Failed to Fetch data</h1>;
    }
    // console.log("selectedCategory: " + selectedCategory);
  } catch (err) {
    console.log(err || err.message);
    return <h1> {err || err.message}</h1>;
  }
};

export default FunCat;
