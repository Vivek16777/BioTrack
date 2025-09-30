// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import xlsx from "xlsx";
import KineticModel from "./Models/PollutantKinetics.js"; // ensure exact case

// 1️⃣ Load environment variables
dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI); // check that it's loaded

// 2️⃣ Connect to MongoDB
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI not found in .env");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected...");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // stop execution if DB connection fails
  }
};

// 3️⃣ Read Excel File
let sheetData = [];
try {
  const workbook = xlsx.readFile(
    "./data/starter_bioremediation_kinetics_dataset.xlsx"
  );
  const sheetName = workbook.SheetNames[0];
  sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  console.log(`📄 Excel rows read: ${sheetData.length}`);
} catch (err) {
  console.error("❌ Error reading Excel file:", err);
  process.exit(1);
}

// 4️⃣ Transform Excel Data → MongoDB Schema
const seedData = sheetData.map((row) => ({
  pollutant: row["Pollutant"],
  microbe: row["Microbe"],
  tref_C: row["Tref_C"],
  half_life_days: row["Half_life_days"],
  q10: row["Q10"],
  ki_mg_per_L: row["Ki_mg_per_L"],
  lag_time_days: row["Lag_time_days"],
  biomass_X_mg_per_L: row["Biomass_X_mg_per_L"],
  q_max_day: row["q_max_day^-1"],
  k_s_mg_per_L: row["K_s_mg_per_L"],
  source: row["Source"],
}));

// 5️⃣ Insert into MongoDB
const seedDB = async () => {
  await connectDB();

  try {
    await KineticModel.deleteMany(); // clear old data
    const inserted = await KineticModel.insertMany(seedData);
    console.log(
      `✅ Data seeded successfully! Rows inserted: ${inserted.length}`
    );
  } catch (err) {
    console.error("❌ Error seeding data:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
