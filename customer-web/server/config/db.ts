import mongoose from "mongoose";

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB error:", err);
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env["MONGO_URI"] as string);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;