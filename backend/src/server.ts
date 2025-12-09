import dotenv from "dotenv";
dotenv.config(); // Load env FIRST

import app from "./app.js";
import { connectionDB } from "./config/db.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectionDB();
  
  app.listen(PORT, () => {
    console.log(`<<< Server is running port : ${PORT} >>>`);
  });
};

startServer();