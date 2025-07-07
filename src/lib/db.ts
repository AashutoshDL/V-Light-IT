import mongoose from "mongoose";

// const cloudURL = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Password}@v-light.nqahw03.mongodb.net/v-light?retryWrites=true&w=majority&appName=V-Light`;
const cloudURL= `mongodb://localhost:27017/v-light`;

if (!cloudURL) {
  throw new Error("MongoDB connection URI is missing.");
}

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log("Already connected to DB.");
    return;
  }

  try {
    const db = await mongoose.connect(cloudURL);
    isConnected = db.connections[0].readyState === 1;
    console.log("Cloud DB Connected");
  } catch (error) {
    const err = error as Error;
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};
