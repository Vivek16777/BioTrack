import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";

await connectDB();

import app from "../app.js";

export default app;
