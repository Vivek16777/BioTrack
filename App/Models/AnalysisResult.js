import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  pollutant: String,
  microbe: String,
  T: Number,
  initialConcentration: Number,
  results: [
    {
      day: Number,
      concentration_mg_per_L: Number,
      biomass_mg_per_L: Number,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("AnalysisResult", resultSchema);
