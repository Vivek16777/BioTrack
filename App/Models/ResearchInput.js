import mongoose from "mongoose";

const researchInputSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    pollutant: String,
    microbe: String,
    tref_C: Number,
    half_life_days: Number,
    q10: Number,
    ki_mg_per_L: Number,
    lag_time_days: Number,
    biomass_X_mg_per_L: Number,
    q_max_day: Number,
    k_s_mg_per_L: Number,
    source: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("ResearchInput", researchInputSchema);
