import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import aiImage from "./routes/aiImage.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/aiImage", aiImage);

app.get("/", async (req, res) => {
  res.send("Hello from Dall-E!");
});

const startServer = async function () {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log("server has started at port http://localhost:8080")
    );
  } catch (err) {
    console.log(err);
  }
};

startServer();
