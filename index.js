import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import "dotenv/config"; //

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth/", userRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Success");
  })
  .catch((err) => {
    console.log(err);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`server started on port :${process.env.PORT}`);
});
