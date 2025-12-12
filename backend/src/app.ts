import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",  // Vite default port
    credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api-v1/auth", authRoutes);
app.use("/api-v1/admin", adminRoutes);

// error middleware
app.use(errorMiddleware);

export default app;
