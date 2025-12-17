import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import truckRoutes from "./routes/truckRoutes.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import tireRoutes from "./routes/tireRoutes.js";
import trailerRoutes from "./routes/trailerRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";


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
app.use("/api-v1/driver", driverRoutes);
app.use("/api-v1/trucks", truckRoutes);
app.use("/api-v1/tires", tireRoutes);
app.use("/api-v1/trailers", trailerRoutes);

// error middleware
app.use(errorMiddleware);

export default app;
