import PollutantKinetics from "../Models/PollutantKinetics.js";
import AnalysisResult from "../Models/AnalysisResult.js";
import {
  calculateRateConstant,
  calculateBiomassGrowth,
  monodEquation,
} from "../utils/formula.js";

// Run analysis & save
export const analyze = async (req, res) => {
  try {
    const { pollutant, microbe, T, initialConcentration } = req.body;

    if (!initialConcentration || initialConcentration <= 0) {
      return res
        .status(400)
        .json({ error: "Provide a valid initial concentration" });
    }

    let record = await PollutantKinetics.findOne({ pollutant, microbe });
    if (!record) {
      const all = await PollutantKinetics.find({});
      if (all.length === 0)
        return res.status(404).json({ error: "No data available" });
      record = all[Math.floor(all.length / 2)]; // fallback median
    }

    const k = calculateRateConstant(
      1 / record.half_life_days,
      record.q10,
      T,
      record.tref_C
    );

    const results = [];
    let C = initialConcentration;
    let biomass = record.biomass_X_mg_per_L;

    for (let day = 1; C > 0.1 && day <= 2000; day++) {
      C = C * Math.exp(-k * 1); // first-order decay
      biomass = calculateBiomassGrowth(biomass, record.q_max_day, 1);

      if (!isFinite(biomass) || biomass < 0) biomass = 0;

      results.push({
        day,
        concentration_mg_per_L: parseFloat(C.toFixed(2)),
        biomass_mg_per_L: parseFloat(biomass.toFixed(2)),
      });
    }

    const savedResult = new AnalysisResult({
      user: req.user.id,
      pollutant,
      microbe,
      T,
      initialConcentration,
      results,
    });
    await savedResult.save();

    res.json(savedResult);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch user’s past history
export const getHistory = async (req, res) => {
  try {
    const history = await AnalysisResult.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
