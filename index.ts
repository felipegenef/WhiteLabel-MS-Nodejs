import express from "express";
import userRouter from "./routes/user";

import morgan from "morgan";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Listening on: ${PORT}`));
