import express from "express";
import authRoutes from "./routes/authRoutes.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(express.json());

// routes
app.use("/api-v1/auth", authRoutes);

// error middleware 
app.use(errorMiddleware);

export default app;
