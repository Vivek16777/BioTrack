import PollutantKinetics from "../Models/PollutantKinetics.js";
import {
  calculateRateConstant,
  calculateBiomassGrowth,
  monodEquation,
} from "../utils/formula.js";

// Helper to compute median
const median = (arr) => {
  const sorted = arr.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
};

export const analyze = async (req, res) => {
  try {
    const { pollutant, microbe, T, initialConcentration } = req.body;

    if (!initialConcentration || initialConcentration <= 0) {
      return res
        .status(400)
        .json({ error: "Provide a valid initial concentration" });
    }

    // Try to find the exact record
    let record = await PollutantKinetics.findOne({ pollutant, microbe });

    if (!record) {
      // Compute median values for missing data
      const allRecords = await PollutantKinetics.find();
      if (!allRecords.length)
        return res
          .status(404)
          .json({ error: "No data available to compute median" });

      const getFieldArray = (field) => allRecords.map((r) => r[field]);

      record = {
        half_life_days: median(getFieldArray("half_life_days")),
        q10: median(getFieldArray("q10")),
        tref_C: median(getFieldArray("tref_C")),
        biomass_X_mg_per_L: median(getFieldArray("biomass_X_mg_per_L")),
        q_max_day: median(getFieldArray("q_max_day")),
        k_s_mg_per_L: median(getFieldArray("k_s_mg_per_L")),
      };
    }

    const k = calculateRateConstant(
      1 / record.half_life_days,
      record.q10,
      T,
      record.tref_C
    );

    let day = 1; // start from day 1
    let concentration = initialConcentration;
    let biomass = record.biomass_X_mg_per_L;
    const threshold = 0.1; // stop when pollutant ~0.1 mg/L
    const timeline = [];

    while (concentration > threshold && day < 2000) {
      const decay = concentration * k; // simple first-order
      concentration -= decay;
      if (concentration < 0) concentration = 0;

      const monod = monodEquation(
        record.q_max_day,
        concentration,
        record.k_s_mg_per_L
      );
      biomass = calculateBiomassGrowth(biomass, monod, 1);
      if (!isFinite(biomass) || biomass < 0) biomass = 0;

      timeline.push({
        day,
        concentration_mg_per_L: concentration.toFixed(2),
        biomass_mg_per_L: biomass.toFixed(2),
      });

      day++; // increment day at the end
    }

    res.json({
      pollutant,
      microbe,
      T,
      initialConcentration,
      timeline,
      days_to_threshold: day - 1, // actual last day reached
      usedMedian: !record.pollutant, // true if median was used
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
