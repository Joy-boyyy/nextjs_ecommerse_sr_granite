const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    // const dbVar = await mongoose.connect("mongodb://127.0.0.1:27017/nextjsdb");
    // dbAtlas;

    const dbVar = await mongoose.connect(process.env.dbAtlas);

    if (dbVar) {
      console.log("Database connected successfully hola !");
    } else {
      console.log("Database connection failed");
    }
  } catch (err) {
    console.log("Database connection error catch", err.message || err);
  }
};

export default dbConnect;

// const mongoose = require("mongoose");

// const dbConnect = async () => {
//   try {
//     const dbVar = await mongoose.connect("mongodb://127.0.0.1:27017/nextjsdb");

//     if (dbVar) {
//       return {
//         message: "Database connected successfully hola !",
//         success: true,
//       };
//     } else {
//       return { message: "Database connection failed", success: false };
//     }
//   } catch (err) {
//     console.log("Database connection error catch", err.message || err);
//     return { message: "Database connection error", success: false };
//   }
// };

// export default dbConnect;
