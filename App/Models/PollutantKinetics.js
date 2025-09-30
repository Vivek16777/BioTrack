import mongoose from "mongoose";

const PollutantkineticsModelSchema = new mongoose.Schema({
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
});

export default mongoose.model(
  "PollutantKinetics",
  PollutantkineticsModelSchema
);
